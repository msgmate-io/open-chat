import UserLoader from "@/components/loaders/UserLoader";
import ChatPage from "@/components/pages/Chat";

export function Page() {
    return <>
        <UserLoader />
        <ChatPage />
    </>;
}