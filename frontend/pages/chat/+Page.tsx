import { Chat } from "#open-chat-ui/chat/Chat";
import { ChatsLoader } from "#open-chat-ui/loaders/ChatsLoader";
import { UserLoader } from "#open-chat-ui/loaders/UserLoader";

export function Page() {
    return <>
        <UserLoader />
        <ChatsLoader />
        <Chat />
    </>;
}