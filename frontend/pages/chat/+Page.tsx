import UserLoader from "@/components/loaders/UserLoader";
import ChatPage from "@/components/pages/Chat";
import ChatsLoader from "@/components/loaders/ChatsLoader";

export function Page(pageContext) {
    return <>
        <UserLoader />
        <ChatsLoader />
        <ChatPage />
    </>;
}