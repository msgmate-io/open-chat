import { RootState } from "@/store/store";
import { Input } from "../ui/input";
import { useSelector } from "react-redux";
import { ChatMessagesLoader } from "../loaders/MessagesLoader";
import {
    Card,
} from "@/components/ui/card"
import { getMessagesByChatId } from "@/store/messages";
import { getChatByChatId } from "@/store/chats";
import logo from "@/assets/logo.png";
import { MessageItem } from "./message";


export function MessagesView() {
    const chatId = useSelector((state: RootState) => state.pageProps.search?.chat)
    const messages = useSelector((state: RootState) => getMessagesByChatId(state, chatId))
    const user = useSelector((state: RootState) => state.user.value)
    const chat = useSelector((state: RootState) => getChatByChatId(state, chatId))
    const isLoading = chatId && !messages

    console.log('messages', messages, chatId, user);

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
                <div className="absolute top-0 mt-2 mr-2 right-0">
                    <Card className="bg-base-200 hover:bg-base-300 p-0 flex" key={"chatListHeader"}>
                        <div className="flex flex-grow items-center content-center justify-start pr-2">
                            <div className="p-2 flex flex-grow">share</div>
                            <div>🗞️</div>
                        </div>
                    </Card>
                </div>
            </div>
            <div className="flex flex-col h-full lg:w-[1000px] relativ">
                <div className="flex flex-col flex-grow gap-2 items-center content-center overflow-y-scroll">
                    {chatId}
                    {isLoading && <div>Loading...</div>}
                    {messages && messages.results.map((message) => <MessageItem message={message} chat={chat} selfIsSender={user.uuid === message.sender} />)}
                </div>
                <Card className="bg-base-200 hover:bg-base-300 p-0 flex" key={"chatListHeader"}>
                    <div className="flex">
                        <img src={logo} className="h-12" alt="logo" />
                    </div>
                    <div className="flex flex-grow items-center content-center justify-start pr-2">
                        <div className="p-2 flex flex-grow">
                            <Input placeholder="Type a message..." />
                        </div>
                        <div>✍️</div>
                    </div>
                </Card>
            </div>
        </div>
    </>
}