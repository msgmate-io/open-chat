import { Chat, ChatsLoader, UserLoader } from "@open-chat/open-chat-ui";

export function Page() {
    return <>
        <UserLoader />
        <ChatsLoader />
        <Chat />
    </>;
}