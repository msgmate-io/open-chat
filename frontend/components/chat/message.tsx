import Markdown from 'react-markdown'
import logo from "@/assets/logo.png";
import { ChatResult, Message } from "@/_api/api";

export function MessageItem({
    message,
    chat,
    selfIsSender = false
}: {
    message: Message,
    chat: ChatResult,
    selfIsSender?: boolean
}) {
    return <div key={message.uuid} className="flex flex-row px-4 w-full relativ max-w-full">
        <div className="flex">
            <div className="w-8 m-2 hidden md:flex">
                {selfIsSender ? <div>🙂</div> : <img src={logo} className="h-8 w-8" alt="logo" />}
            </div>
        </div>
        <div className="flex flex-col flex-grow relative">
            <div className="flex flex-row font-bold">
                {selfIsSender ? "You" : `${chat?.partner?.first_name} ${chat?.partner?.second_name}`}
            </div>
            <div className="article prose w-full overflow-x-scroll">
                <Markdown>{message.text}</Markdown>
            </div>
        </div>
    </div>
}