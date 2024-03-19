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
import {
    getPanelElement,
    getResizeHandleElement,
    getPanelGroupElement
} from "react-resizable-panels";
import { useEffect, useRef } from "react";

function CollapseIndicator({
    isCollapsed,
    onToggle,
}) {
    return <div className="h-full pl-2 flex content-center items-center bg-opacity-100">
        <div className="absolute z-10" onClick={onToggle}>{isCollapsed ? "➡️" : "⬅️"}</div>
    </div>
}


function useMobileConfig(chatId) {
    return {
        left: {
            minSize: chatId ? 0 : 100,
            defaultSize: chatId ? 0 : 100,
            collapsedSize: 0,
            collapsible: true
        },
        right: {
            minSize: !chatId ? 0 : 100,
            defaultSize: !chatId ? 0 : 100,
            collapsedSize: 0,
            collapsible: true
        }
    }
}

export function Resizable({
    left, right
}) {

    const leftPannelRef = useRef(null)
    const rightPannelRef = useRef(null)

    const chatId = useSelector((state: RootState) => state.pageProps.search?.chat)
    const { isSm: biggerThanSm } = useBreakpoint('sm')
    const [, setLeftCollapsed] = useState(false)
    const [, setRightCollapsed] = useState(false)
    const mobileConfig = useMobileConfig(chatId)
    console.log("chatId", chatId)

    const desktopConfig = {
        left: {
            minSize: 18,
            defaultSize: 25,
            collapsedSize: 0,
            collapsible: true
        },
        right: {
            minSize: 60,
            defaultSize: 75,
            collapsible: true,
            collapsedSize: 60,
        }
    }

    useEffect(() => {
        if (!biggerThanSm) {
            // layout changed to mobile
            if (chatId) {
                // chat selected -> hide left panel
                leftPannelRef.current.collapse()
                setLeftCollapsed(true)
            } else if (!chatId) {
                // chat not selected -> hide right panel
                rightPannelRef.current.collapse()
                setRightCollapsed(true)
            }
        }
    }, [biggerThanSm, chatId]);


    const onToggleCollapse = () => {
        const isCollapsed = leftPannelRef.current.isCollapsed()
        if (isCollapsed) {
            leftPannelRef.current.expand()
        } else {
            leftPannelRef.current.collapse()
        }
        setLeftCollapsed(!isCollapsed)
    }

    const onLeftPannelCollapseChanged = () => {
        setLeftCollapsed(leftPannelRef.current.isCollapsed())
    }


    return (
        <ResizablePanelGroup
            direction="horizontal"
            className="rounded-lg border"
            id="group"
        >
            <ResizablePanel
                onCollapse={onLeftPannelCollapseChanged}
                onExpand={onLeftPannelCollapseChanged}
                ref={leftPannelRef}
                id="left-panel"
                {...(biggerThanSm ? desktopConfig.left : mobileConfig.left)} order={1}>
                <div className="flex flex-col h-full p-2 relative">
                    {left}
                </div>
            </ResizablePanel>
            {biggerThanSm && <ResizableHandle id="resize-handle" withHandle />}
            {biggerThanSm && <CollapseIndicator isCollapsed={leftPannelRef.current?.isCollapsed()} onToggle={onToggleCollapse} />}
            <ResizablePanel ref={rightPannelRef} id="right-panel" {...(biggerThanSm ? desktopConfig.right : mobileConfig.right)} order={2}>
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