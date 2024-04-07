import dotenv from 'dotenv';
import OpenAI from 'openai';
import { Api } from './api';
import { setupClient } from "./client";

dotenv.config();

const botManagerUsername = process.env.BOT_MANAGER_USERNAME || "admin";
const botManagerPassword = process.env.BOT_MANAGER_PASSWORD || "password";
const botUsername = process.env.BOT_USERNAME || "msgmatebot2";
const botPassword = process.env.BOT_PASSWORD || "Test123!";
const botContactPassword = process.env.BOT_CONTACT_PASSWORD || null;

const serverHost = process.env.SERVER_HOST || "localhost";
const serverWsProtocol = process.env.SERVER_WS_PROTOCOL || "ws://";
const serverHttpProtocol = process.env.SERVER_HTTP_PROTOCOL || "http://";
console.log('serverHost', serverHost, 'serverWsProtocol', serverWsProtocol, 'serverHttpProtocol', serverHttpProtocol);

const modelApiServer = process.env.MODEL_API_SERVER || "";
const modelApiToken = process.env.MODEL_API_TOKEN || ""
const modelApiDefaultModel = process.env.MODEL_API_DEFAULT_MODEL || "gpt-3.5-turbo"
const modelApiAllowModelSelection = (process.env.MODEL_API_ALLOW_MODEL_SELECTION == "true") || false;

const botFirstName = process.env.BOT_FIRST_NAME || "NodeJS";
const botSecondName = process.env.BOT_SECOND_NAME || "Bot";

const botDescription = process.env.BOT_DESCRIPTION || "General example for an AI-Bot using nodejs";
const botDescriptionTitle = process.env.BOT_DESCRIPTION_TITLE || "NodeJS Bot"

const botIsPublic = (process.env.BOT_IS_PUBLIC == "true") || false;
const botRevealSecret = process.env.BOT_REVEAL_SECRET || "";

const botMessageStreamingDefault = (process.env.BOT_MESSAGE_STREAMING_DEFAULT == "true") || false;

const openai = new OpenAI({
    apiKey: modelApiToken,
    baseURL: modelApiServer
});

const DB = {
    chats: null,
    messages: {},
    selectedModels: {},
    chatMessageSteaming: {},
    defaultModel: modelApiDefaultModel,
    bot: null
}

const insertChatIntoDB = (chat) => {
    DB.chats.results = [DB.chats.results.filter((c) => c.uuid !== chat.uuid), chat];
}

const insertMessageIntoDB = (api: typeof Api.prototype.api, chat, message) => {
    if (!DB.messages[chat.uuid]) {
        DB.messages[chat.uuid] = null
        console.log('chat messages not present fetching recent messages')
        api.messagesList2({ chatUuid: chat.uuid, page_size: 2 }).then((messages) => {
            console.log('fetched messages', messages)
            DB.messages[chat.uuid] = messages;
        })
    } else {
        DB.messages[chat.uuid].results = [...DB.messages[chat.uuid].results.filter((m) => m.uuid !== message.uuid), message];
    }
};

const getOpenAiMessageHistory = (chat, message, maxMessageContext = 4) => {
    console.log('getOpenAiMessageHistory', chat, message)
    if (!DB.messages[chat.uuid]) {
        return [{
            role: 'user',
            content: message.text
        }];
    }
    let prevMessages = DB.messages[chat.uuid].results.filter((m) => m.uuid !== message.uuid)
    prevMessages = prevMessages.slice(Math.max(prevMessages.length - maxMessageContext, 0))
    prevMessages.push(message);
    console.log('prevMessages', prevMessages, prevMessages.results)

    return prevMessages.map((m) => ({
        role: m.sender === DB.bot.uuid ? 'assistant' : 'user',
        content: m.text
    }));


}


function sendCustomEvent(action, payload, socket: WebSocket) {
    socket.send(JSON.stringify({
        type: 'custom',
        data: {
            action,
            payload
        }
    }));
}

async function performStreamedReponse(api: typeof Api.prototype.api, socket, chat, senderId, message, model) {
    const historyQuery = getOpenAiMessageHistory(chat, message, 10);
    const chatCompletion = await openai.chat.completions.create({
        messages: historyQuery,
        model: model,
        stream: true
    });
    let fullResponse = '';
    for await (const completion of chatCompletion) {
        const [choice] = completion.choices;
        const { content } = choice.delta;
        console.log('streamed response', content);
        if (content === null || content === undefined) {
            continue;
        }
        fullResponse += content;
        await sendCustomEvent('partial_message', {
            chat_id: chat.uuid,
            recipient_id: senderId,
            text: fullResponse
        }, socket);
    }

    sendCustomEvent('send_message', {
        chat_id: chat.uuid,
        recipient_id: senderId,
        text: fullResponse
    }, socket);

    return fullResponse;
}

const COMMAND_OVERVIEW = `${modelApiAllowModelSelection ? '/model - Get or set the selected model\n' : ''}${modelApiAllowModelSelection ? '/model <model-name> - Select a model\n' : ''}
/steaming ('on' or 'off') - Toggle streaming mode
/ping - Test if the bot is alive
/profile - Get the bot profile
`

function processCustomMessage(action, payload, api: typeof Api.prototype.api, socket: WebSocket) {
    if (action === 'newMessage') {
        const { senderId, chat, message } = payload;

        console.log('newMessage: by', senderId, 'in', chat.uuid, ":\n", message);

        // 0 - insert into db
        insertChatIntoDB(chat);
        insertMessageIntoDB(api, chat, message);

        // 1 - instantly mark message as read
        sendCustomEvent('mark_chat_message_read', {
            chat_id: chat.uuid,
            sender_id: senderId,
            message_id: message.uuid,
        }, socket);

        // 2 - check if it's a command
        if (message.text.startsWith('/')) {
            const command = message.text.slice(1);
            if (command.startsWith('help')) {
                sendCustomEvent('send_message', {
                    chat_id: chat.uuid,
                    recipient_id: senderId,
                    text: "```" + COMMAND_OVERVIEW + "```"
                }, socket);
            } else if (command.startsWith('steaming')) {
                const onOrOff = command.split(' ')[1];  // Get the model name (if any)
                if (!onOrOff) {
                    const chatSteamingFlag = chat.uuid in DB.chatMessageSteaming ? DB.chatMessageSteaming[chat.uuid] : botMessageStreamingDefault;
                    sendCustomEvent('send_message', {
                        chat_id: chat.uuid,
                        recipient_id: senderId,
                        text: `Message streaming for this chat is ${chatSteamingFlag ? '`enabled`' : '`disabled`'}`
                    }, socket);
                } else {
                    const flag = onOrOff === 'on';
                    DB.chatMessageSteaming[chat.uuid] = flag;
                    sendCustomEvent('send_message', {
                        chat_id: chat.uuid,
                        recipient_id: senderId,
                        text: `Update chat steaming flag ${flag ? '`enabled`' : '`disabled`'}`
                    }, socket);
                }
            }
            else if (command.startsWith('ping')) {
                sendCustomEvent('send_message', {
                    chat_id: chat.uuid,
                    recipient_id: senderId,
                    text: 'Pong!'
                }, socket);
            }
            else if (command.startsWith('profile')) {
                sendCustomEvent('send_message', {
                    chat_id: chat.uuid,
                    recipient_id: senderId,
                    text: "```json\n" + JSON.stringify(chat.partner, null, 2) + "\n```"
                }, socket);
            }
            else if (command.startsWith('model') && modelApiAllowModelSelection) {
                const modelName = command.split(' ')[1];  // Get the model name (if any)
                if (modelName) {
                    DB.selectedModels[chat.uuid] = modelName;
                    sendCustomEvent('send_message', {
                        chat_id: chat.uuid,
                        recipient_id: senderId,
                        text: `Selected model: ${DB.selectedModels[chat.uuid]}`
                    }, socket);
                } else if (!modelName && DB.selectedModels[chat.uuid]) {
                    sendCustomEvent('send_message', {
                        chat_id: chat.uuid,
                        recipient_id: senderId,
                        text: `Selected model: ${DB.selectedModels[chat.uuid]}`
                    }, socket);
                }
                else {
                    sendCustomEvent('send_message', {
                        chat_id: chat.uuid,
                        recipient_id: senderId,
                        text: `No model selected model using default ${DB.defaultModel}. Use /model <model-name> to select a model`
                    }, socket);
                }
            }
            else {
                sendCustomEvent('send_message', {
                    chat_id: chat.uuid,
                    recipient_id: senderId,
                    text: `Unknown command: ${command}`
                }, socket);
            }
            return true
        }
        // 3 - perform default action here just a simple rely using gpt-3.5-turbo
        const historyQuery = getOpenAiMessageHistory(chat, message, 10);
        console.log('historyQuery', historyQuery);
        let model = DB.defaultModel;

        if (chat.uuid in DB.selectedModels) {
            model = DB.selectedModels[chat.uuid];
        }

        const chatSteamingFlag = chat.uuid in DB.chatMessageSteaming ? DB.chatMessageSteaming[chat.uuid] : botMessageStreamingDefault;
        if (!chatSteamingFlag) {
            const chatCompletion = openai.chat.completions.create({
                messages: historyQuery,
                model: model,
            });
            chatCompletion.then((response) => {
                // TODO: register api usage
                console.log('response', response);
                api.messagesSendCreate(chat.uuid, {
                    text: response.choices[0].message.content
                }).then((message) => {
                    console.log('sent message', message);
                    insertMessageIntoDB(api, chat, message);
                }).catch((err) => {
                    console.error('failed to send message', err);
                });
            });
        } else {
            performStreamedReponse(api, socket, chat, senderId, message, model).then((fullResponse) => {
                // TODO:  insertMessageIntoDB(api, chat, message);
            });
        }
        return true
    }
    return false
}

async function setupBot() {
    console.log('trying to create bot account');
    try {
        const { api, user, socket } = await setupClient({
            username: botManagerUsername,
            password: botManagerPassword,
            host: serverHost,
            wsProtocol: serverWsProtocol,
            httpProtocol: serverHttpProtocol
        });
        const bot = await api.botRegisterCreate({
            username: botUsername,
            password: botPassword,
            password_confirm: botPassword,
            first_name: botFirstName,
            second_name: botSecondName,
            public: botIsPublic,
            reveal_secret: botRevealSecret,
            contact_password: botContactPassword, // optional
            description: botDescription,
            description_title: botDescriptionTitle
        }).catch((err) => {
            console.error('failed to create bot account', err);
        });
        console.log('bot created', bot);
        await api.logoutRetrieve();
    } catch (err) {
        console.error('failed to login as bot manager', err);
    }
}

async function main() {
    await setupBot();
    const { api, user, socket } = await setupClient({
        username: botUsername,
        password: botPassword,
        host: serverHost,
        wsProtocol: serverWsProtocol,
        httpProtocol: serverHttpProtocol
    });
    console.log('logged in as bot', user);

    DB.bot = user;

    const asyncQueue = [];
    let isProcessing = false;

    socket.on('open', function open() {
        socket.on('message', function incoming(data) {
            asyncQueue.push(data);
            processData();
        });
        console.log('connected, listener setup');
    });

    async function processData() {
        if (isProcessing || asyncQueue.length === 0) {
            return;
        }
        isProcessing = true;
        try {
            const data = asyncQueue.shift();
            const message = JSON.parse(data.toString());
            let processed = false;
            if (message.type === 'custom') {
                const { action, payload } = message.data;
                processed = await processCustomMessage(action, payload, api, socket);
            }
            if (!processed)
                console.warn('unprocessed', JSON.stringify(message, null, 2));
        } catch (error) {
            console.error('Error while processing message:', error);
        } finally {
            isProcessing = false;
        }
        setImmediate(processData);
    }

    api.chatsList({ page_size: 20 }).then((chats) => {
        DB.chats = chats;
        console.log(`fetched ${chats.results?.length} chats`);
    });
}

main();