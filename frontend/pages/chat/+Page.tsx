import { Chat, Loaders } from "@open-chat/open-chat-ui";

export function Page() {
    return <>
        <Loaders.UserLoader />
        <Loaders.ChatsLoader />
        <Chat />
    </>;
}