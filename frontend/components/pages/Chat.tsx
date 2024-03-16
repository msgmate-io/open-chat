export default ChatPage;

import { LoginNavbar } from "@/components/pages/HomePage";

function ChatPage() {
    return <div className="h-screen w-screen flex flex-col">
        <LoginNavbar />
        <h1>Chat</h1>
    </div>
}