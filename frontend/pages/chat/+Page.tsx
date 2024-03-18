import UserLoader from "@/components/loaders/UserLoader";
import ChatPage from "@/components/pages/Chat";
import ChatsLoader from "@/components/loaders/ChatsLoader";
import WebsocketBridge from "@/WebsocketBridge";

export function Page(pageContext) {
    return <>
        <WebsocketBridge />
        <UserLoader />
        <ChatsLoader />
        <ChatPage />
    </>;
}