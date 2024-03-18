export default ChatPage;

import { useState } from "react";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import { ChatsList } from "../chat/ChatView";
import { MessagesView } from "../chat/MessageView";
import { Toaster } from "../ui/sonner";


export function Resizable({
    left, right
}) {
    return (
        <ResizablePanelGroup
            direction="horizontal"
            className="min-h-[200px] rounded-lg border"
        >
            <ResizablePanel minSize={18} defaultSize={25} collapsedSize={0} collapsible={true}>
                <div className="flex flex-col h-full p-2 relative">
                    {left}
                </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={75} minSize={60}>
                <div className="flex h-full items-center justify-center content-center relative">
                    {right}
                </div>
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}

function Chat() {
    // h-[calc(100vh-3.7rem)]
    return <>
        <div className="flex h-screen">
            <Resizable
                left={<ChatsList />}
                right={<MessagesView />}
            />
        </div>
    </>

}

function ChatPage() {

    return <>
        <Chat />
        <Toaster />
    </>
}