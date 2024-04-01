import WebSocket from 'ws';
import { Api, AugmentedBotUser } from "./api";

export async function setupClient({
    username = "",
    password = "",
    host = "localhost:8000",
    httpProtocol = "http://",
    wsProtocol = "ws://",
    adminLogin = false,
}): Promise<{
    api: typeof Api.prototype.api,
    user: AugmentedBotUser,
    socket: WebSocket,
}> {
    const getClient = ({
        sessionId = "",
        csrfToken = "",
    }) => {
        return new Api({
            baseUrl: `${httpProtocol}${host}`,
            baseApiParams: {
                headers: {
                    "X-CSRFToken": csrfToken,
                    cookie: `sessionid=${sessionId}; csrftoken=${csrfToken}`,
                }
            },
        }).api;
    }
    let api = getClient({});

    const user = await api.botLoginCreate({
        username,
        password
    });
    api = getClient({
        sessionId: user.sessionid,
        csrfToken: user.csrftoken,
    });

    const socket = new WebSocket(`${wsProtocol}${host}/api/core/ws`, {
        headers: {
            cookie: `sessionid=${user.sessionid}; csrftoken=${user.csrftoken}`,
        },
    });
    return { api, user, socket };
}