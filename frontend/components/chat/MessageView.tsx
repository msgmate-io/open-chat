import { RootState } from "@/store/store";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner"
import { ChatMessagesLoader } from "../loaders/MessagesLoader";
import {
    Card,
} from "@/components/ui/card"
import { getMessagesByChatId, insertMessage } from "@/store/messages";
import { getChatByChatId, updateNewestMessage } from "@/store/chats";
import logo from "@/assets/logo.png";
import { MessageItem } from "./message";
import { Button } from "../ui/button";
import { useApi } from "@/_api/client2";
import { ChatResult } from "@/_api/api";
import { navigateSearch } from "../atoms/Link";

function MessageViewInput({
    chat,
    scrollToBottom = () => { }
}: {
    chat: ChatResult,
    scrollToBottom: () => void
}) {
    const inputRef = useRef<HTMLInputElement>(null)
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()
    const api = useApi()

    const onSendMessage = () => {
        setIsLoading(true)
        api.messagesSendCreate(chat.uuid, { text: inputRef.current?.value }).then((res) => {
            dispatch(insertMessage({ chatId: chat.uuid, message: res }))
            dispatch(updateNewestMessage({ chatId: chat.uuid, message: res }))
            setTimeout(() => {
                scrollToBottom()
                setIsLoading(false)
            }, 50)
        }).catch((err) => {
            setIsLoading(false)
            toast.error(`Failed to send message: ${err}`)
        })
    }

    return <Card className="bg-base-200 hover:bg-base-300 p-0 flex" key={"chatListHeader"}>
        <div className="flex">
            <img src={logo} className="h-12" alt="logo" />
        </div>
        <div className="flex flex-grow items-center content-center justify-start pr-2">
            <div className="p-2 flex flex-grow">
                <Input ref={inputRef} placeholder="Type a message..." disabled={isLoading} />
            </div>
            <Button onClick={onSendMessage} disabled={isLoading}  >
                <div>✍️</div>
                Send
            </Button>
        </div>
    </Card>
}

function MessageScrollView({ chatId, chat }) {
    const scrollRef = useRef<HTMLDivElement>(null)
    const messages = useSelector((state: RootState) => getMessagesByChatId(state, chatId))
    const user = useSelector((state: RootState) => state.user.value)
    const isLoading = chatId && !messages

    const scrollToBottom = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    return <div className="flex flex-col h-full w-full lg:max-w-[900px] relativ">
        <div ref={scrollRef} className="flex flex-col flex-grow gap-2 items-center content-center overflow-y-scroll">
            {chatId}
            {isLoading && <div>Loading...</div>}
            {messages && messages.results.map((message) => <MessageItem key={`msg_${message.uuid}`} message={message} chat={chat} selfIsSender={user?.uuid === message.sender} />).reverse()}
        </div>
        <MessageViewInput chat={chat} scrollToBottom={scrollToBottom} />
    </div>
}

function MobileBackButton() {
    return <div className="z-10 sm:hidden absolute top-0 mt-2 mr-2 right-0" onClick={() => {
        navigateSearch({ chat: null })
    }}>
        <Card className="bg-base-200 hover:bg-base-300 p-0 flex" key={"chatListHeader"}>
            <div className="flex flex-grow items-center content-center justify-start pl-2">
                <div>👈</div>
                <div className="p-2 flex flex-grow">back</div>
            </div>
        </Card>
    </div>
}

export function NewChatCard() {
    return <div className="flex flex-col h-full w-full content-center items-center">
        <div className="w-full flex items-center content-center justify-left">
            <MobileBackButton />
        </div>
        New chat card
    </div>
}

export function MessagesView({ chatId }) {
    const chat = useSelector((state: RootState) => getChatByChatId(state, chatId))

    return <>
        <ChatMessagesLoader chatId={chatId} />
        <div className="flex flex-col h-full w-full content-center items-center">
            <div className="w-full flex items-center content-center justify-left">
                <div className="absolute top-0 mt-2 ml-2">
                    <Card className="bg-base-200 hover:bg-base-300 p-0 flex" key={"chatListHeader"}>
                        <div className="flex">
                        </div>
                        {!chatId && <div className="flex flex-grow items-center content-center justify-start pr-2">
                            <div className="p-2 flex flex-grow">Model Select</div>
                            <div>
                                👾
                            </div>
                        </div>}
                    </Card>
                </div>
                <MobileBackButton />
            </div>
            <MessageScrollView chatId={chatId} chat={chat} />
        </div>
    </>
}