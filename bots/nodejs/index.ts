import { setupClient } from "./client";
import OpenAI from 'openai';

const apiKey = "Your-api-key";

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

function processCustomMessage(action, payload, socket: WebSocket) {
    if (action === 'newMessage') {
        const { senderId, chat, message } = payload;

        console.log('newMessage: by', senderId, 'in', chat.uuid, ":\n", message);

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
        }
        // 3 - perform default action here just a simple rely using gpt-3.5-turbo
        const chatCompletion = openai.chat.completions.create({
            messages: [{ role: 'user', content: message.text }],
            model: 'gpt-3.5-turbo',
        });
        chatCompletion.then((response) => {
            console.log('response', response);
            sendCustomEvent('send_message', {
                chat_id: chat.uuid,
                recipient_id: senderId,
                text: response.choices[0].message.content
            }, socket);
        });

        return true
    }
    return false
}

async function main() {
    const { api, user, socket } = await setupClient({
        username: "test+msgmate1@msgmate.io",
        password: "Test123!",
    });

    socket.on('open', function open() {
        socket.on('message', function incoming(data) {
            const message = JSON.parse(data.toString());
            let processed = false;
            if (message.type === 'custom') {
                const { action, payload } = message.data;
                processed = processCustomMessage(action, payload, socket);
            }
            if (!processed)
                console.warn('unprocessed', JSON.stringify(message, null, 2));

        });
        console.log('connected');
    })
}

main();