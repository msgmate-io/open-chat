export default ChatPage;

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useBreakpoint } from "@/lib/utils";
import { RootState } from "@/store/store";
import Cookies from 'js-cookie';
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import WebsocketBridge from "../atoms/WebsocketBridge";
import { ChatsList } from "../chat/ChatView";
import { CreateChatCard, MessagesView, NewChatCard } from "../chat/MessageView";
import { Toaster } from "../ui/sonner";

function CollapseIndicator({
    isCollapsed,
    onToggle,
}) {
    return <div className="h-full flex content-center items-center bg-opacity-100">
        <div className="absolute z-10" onClick={onToggle}>{isCollapsed ? "➡️" : "⬅️"}</div>
    </div>
}


function useMobileConfig(
    chatId,
    defaultLeftSize = null,
    defaultRightSize = null
) {
    return {
        left: {
            minSize: chatId ? 0 : 100,
            defaultSize: defaultLeftSize || (chatId ? 0 : 100),
            collapsedSize: 0,
            collapsible: true
        },
        right: {
            minSize: !chatId ? 0 : 100,
            defaultSize: defaultRightSize || (!chatId ? 0 : 100),
            collapsedSize: 0,
            collapsible: true
        }
    }
}

function useDesktopConfig(
    defaultLeftSize = null,
    defaultRightSize = null
) {
    return {
        left: {
            minSize: 18,
            defaultSize: defaultLeftSize || 25,
            collapsedSize: 0,
            collapsible: true
        },
        right: {
            minSize: 60,
            defaultSize: defaultRightSize || 75,
            collapsible: true,
            collapsedSize: 60,
        }
    }
}

export function Resizable({
    left, right
}) {

    const leftPannelRef = useRef(null)
    const rightPannelRef = useRef(null)

    const frontend = useSelector((state: RootState) => state.frontend)
    const chatId = useSelector((state: RootState) => state.pageProps.search?.chat)
    const { isSm: biggerThanSm } = useBreakpoint('sm')
    const [, setLeftCollapsed] = useState(false)
    const [, setRightCollapsed] = useState(false)




    const layout = frontend?.resizableLayout

    let defaultLayout;
    if (layout) {
        console.log("DEF layout", layout)
        defaultLayout = JSON.parse(layout);
    }
    const defaultLayoutLeft = defaultLayout ? defaultLayout[0] : null;
    const defaultLayoutRight = defaultLayout ? defaultLayout[1] : null;
    const mobileConfig = useMobileConfig(
        chatId,
        defaultLayoutLeft,
        defaultLayoutRight
    )
    const desktopConfig = useDesktopConfig(
        defaultLayoutLeft,
        defaultLayoutRight
    )

    console.log("chatId", chatId)
    console.log("FRONTEND", frontend)

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

    const onLayout = (sizes) => {
        console.log("onLayout", sizes)
        Cookies.set('react-resizable-panels-layout', JSON.stringify(sizes))
    }


    const desktopLayoutLogic = false //defaultLayout && biggerThanSm
    console.log("USING DESKTOP LAYOUT LOGIC", desktopLayoutLogic)


    return (
        <ResizablePanelGroup
            direction="horizontal"
            className=""
            id="group"
            onLayout={onLayout}
        >
            <ResizablePanel
                onCollapse={onLeftPannelCollapseChanged}
                onExpand={onLeftPannelCollapseChanged}
                ref={leftPannelRef}
                id="left-panel"
                {...(biggerThanSm ? desktopConfig.left : mobileConfig.left)}
                order={1}
            >
                <div className="flex flex-col h-full p-2 relative">
                    {left}
                </div>
            </ResizablePanel>
            {biggerThanSm && <ResizableHandle id="resize-handle" withHandle />}
            {biggerThanSm && <CollapseIndicator isCollapsed={leftPannelRef.current?.isCollapsed()} onToggle={onToggleCollapse} />}
            <ResizablePanel
                ref={rightPannelRef}
                id="right-panel"
                {...(biggerThanSm ? desktopConfig.right : mobileConfig.right)}
                order={2}
            >
                <div className="flex h-full items-center justify-center content-center relative">
                    {right}
                </div>
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}

const chatMessageViews = ["new", "create"]

function Chat() {
    const chatId = useSelector((state: RootState) => state.pageProps.search?.chat)
    const userId = useSelector((state: RootState) => state.pageProps.search?.userId)

    return <>
        <div className="flex h-screen">
            <Resizable
                left={<ChatsList />}
                right={<>
                    {!(chatMessageViews.indexOf(chatId) !== -1) && <MessagesView chatId={chatId} />}
                    {chatId === "new" && <NewChatCard />}
                    {chatId === "create" && <CreateChatCard userId={userId} />}
                </>}
            />
        </div>
    </>

}

function ChatPage() {

    return <>
        <WebsocketBridge />
        <Chat />
        <Toaster />
    </>
}