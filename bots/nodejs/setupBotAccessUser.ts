import dotenv from 'dotenv';

import { setupClient } from "./client";

dotenv.config();

const botManagerUsername = process.env.BOT_MANAGER_USERNAME || "admin";
const botManagerPassword = process.env.BOT_MANAGER_PASSWORD || "password";

const serverHost = process.env.SERVER_HOST || "localhost";
const serverWsProtocol = process.env.SERVER_WS_PROTOCOL || "ws://";
const serverHttpProtocol = process.env.SERVER_HTTP_PROTOCOL || "http://";

// script secitic:

const botExplorerUsername = process.env.BOT_EXPLORER_USERNAME || 'bot-explorer'
const botExplorerPassword = process.env.BOT_EXPLORER_PASSWORD || 'BotExplore123!'
const botExplorerFirstName = process.env.BOT_EXPLORER_FIRST_NAME || 'Bot'
const botExplorerSecondName = process.env.BOT_EXPLORER_SECOND_NAME || 'Explorer'

const botUsernames = JSON.parse(process.env.BOT_USERNAMES || '[]')
const botRevealSecrets = JSON.parse(process.env.BOT_REVEAL_SECRETS || '[]')
const botContactSecrets = JSON.parse(process.env.BOT_CONTACT_SECRETS || '[]')

async function createBotExplorer() {
    // Sets up a simple user with a chat to every bot in the list
    // -> Existing chats can be continued and they reveal the contact to that user
    try {
        const { api, user, socket } = await setupClient({
            username: botManagerUsername,
            password: botManagerPassword,
            host: serverHost,
            wsProtocol: serverWsProtocol,
            httpProtocol: serverHttpProtocol
        });
        const bot = await api.botRegisterCreate({
            username: botExplorerUsername,
            password: botExplorerPassword,
            password_confirm: botExplorerPassword,
            first_name: botExplorerFirstName,
            second_name: botExplorerSecondName,
            public: false,
            reveal_secret: "RandomRevelSecret", // TODO set random
            contact_password: null,
            description: "I'm a cool user as I have access to a lot of open-chat bots.",
            description_title: "Bot Explorer"
        }).catch((err) => {
            console.error('failed to create bot account', err);
        });
        console.log('bot created', bot);
        await api.logoutRetrieve();
        return true
    } catch (err) {
        console.error('failed to login as bot manager', err);
        return false
    }
}

async function main() {
    // 1 - setup the exporer bot
    const created = await createBotExplorer();
    /**
    if (!created) {
        console.error('failed to create bot explorer, exiting.');
        return;
    } */
    // 2 - setup chats with all the bots
    const { api, user, socket } = await setupClient({
        username: botExplorerUsername,
        password: botExplorerPassword,
        host: serverHost,
        wsProtocol: serverWsProtocol,
        httpProtocol: serverHttpProtocol
    });
    console.log('logged in as bot', user);
    await botUsernames.forEach(async (botUsername, i) => {
        try {
            const profile = await api.profileRevealRetrieve({ username: botUsername, reveal_secret: botRevealSecrets[i] })
            await api.profileCreateChatCreate({
                userUuid: profile.uuid,
                reveal_secret: botRevealSecrets[i],
                contact_secret: botContactSecrets[i]
            }, {
                text: "Hello, I'm the bot explorer. I'm here to explore your bot. Can you tell me more about yourself?",
            })
        } catch (err) {
            console.error('failed to setup chat with bot', botUsername, err);
        }
    });
    //await api.logoutRetrieve();
}

main();