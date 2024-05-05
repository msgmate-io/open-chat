import ChatsLoader from "@open-chat-ui/loaders/ChatsLoader";
import UserLoader from "@open-chat-ui/loaders/UserLoader";
import ChatPage from "@open-chat-ui/pages/Chat";

export function Page(pageContext) {
    return <>
        <UserLoader />
        <ChatsLoader />
        <ChatPage />
    </>;
}