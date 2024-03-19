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
import { useBreakpoint } from "@/lib/utils";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";


export function Resizable({
    left, right
}) {

    const chatId = useSelector((state: RootState) => state.pageProps.search?.chat)
    const { isSm: biggerThanSm } = useBreakpoint('sm')
    console.log('biggerThanSm: ', biggerThanSm);

    const desktopConfig = {
        left: {
            minSize: 18,
            defaultSize: 25,
            collapsedSize: 0,
            collapsible: true
        },
        right: {
            minSize: 60,
            defaultSize: 75
        }
    }

    const mobileConfig = {
        left: {
            minSize: chatId ? 0 : 100,
            defaultSize: chatId ? 0 : 100,
        },
        right: {
            minSize: !chatId ? 0 : 100,
            defaultSize: !chatId ? 0 : 100,
        }
    }

    return (
        <ResizablePanelGroup
            direction="horizontal"
            className="rounded-lg border"
        >
            <ResizablePanel {...(biggerThanSm ? desktopConfig.left : mobileConfig.left)}>
                <div className="flex flex-col h-full p-2 relative">
                    {left}
                </div>
            </ResizablePanel>
            {biggerThanSm && <ResizableHandle withHandle />}
            <ResizablePanel {...(biggerThanSm ? desktopConfig.right : mobileConfig.right)}>
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