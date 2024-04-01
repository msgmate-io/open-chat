import OpenAI from 'openai';
import { Api } from './api';
import { setupClient } from "./client";

const apiKey = "...";
const botManagerUsername = "admin";
const botManagerPassword = "password";

const botUsername = "msgmatebot2";
const botPassword = "Test123!";
const botContactPassword = "password"

const serverHost = "localhost";
const serverWsProtocol = "ws://";
const serverHttpProtocol = "http://";

const DB = {
    chats: null,
    messages: {},
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

const openai = new OpenAI({
    apiKey: apiKey,
});

function sendCustomEvent(action, payload, socket: WebSocket) {
    socket.send(JSON.stringify({
        type: 'custom',
        data: {
            action,
            payload
        }
    }));
}

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
            switch (command) {
                case 'ping':
                    sendCustomEvent('send_message', {
                        chat_id: chat.uuid,
                        recipient_id: senderId,
                        text: 'Pong!'
                    }, socket);
                    break;
                case 'profile':
                    sendCustomEvent('send_message', {
                        chat_id: chat.uuid,
                        recipient_id: senderId,
                        text: "```json\n" + JSON.stringify(chat.partner, null, 2) + "\n```"
                    }, socket);
                    break;
                default:
                    sendCustomEvent('send_message', {
                        chat_id: chat.uuid,
                        recipient_id: senderId,
                        text: `Unknown command: ${command}`
                    }, socket);
                    break;
            }
            return true
        }
        // 3 - perform default action here just a simple rely using gpt-3.5-turbo
        const historyQuery = getOpenAiMessageHistory(chat, message, 10);
        console.log('historyQuery', historyQuery);
        const chatCompletion = openai.chat.completions.create({
            messages: historyQuery,
            model: 'gpt-3.5-turbo',
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
            first_name: "GPT-3.5",
            second_name: "Turbo",
            public: false,
            reveal_secret: "TurboBot",
            requires_contact_password: true,
            contact_password: botContactPassword,
            description: "GPT-3.5 Turbo Bot",
            description_title: "OpenAI Bot:",
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


    socket.on('open', function open() {
        socket.on('message', function incoming(data) {
            const message = JSON.parse(data.toString());
            let processed = false;
            if (message.type === 'custom') {
                const { action, payload } = message.data;
                processed = processCustomMessage(action, payload, api, socket);
            }
            if (!processed)
                console.warn('unprocessed', JSON.stringify(message, null, 2));
        });
        console.log('connected, listener setup');
    })

    api.chatsList({ page_size: 20 }).then((chats) => {
        DB.chats = chats;
        console.log(`fetched ${chats.results?.length} chats`);
    });
}

main();