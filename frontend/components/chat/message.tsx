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
    return <div key={message.uuid} className="flex flex-row px-4 w-full relativ">
        <div className="flex">
            <div className="w-8 flex m-2">
                {selfIsSender ? <div>🙂</div> : <img src={logo} className="h-8 w-8" alt="logo" />}
            </div>
        </div>
        <div className="flex flex-col flex-grow">
            <div className="flex flex-row font-bold">
                {selfIsSender ? "You" : `${chat?.partner?.first_name} ${chat?.partner?.second_name}`}
            </div>
            <div className="article prose max-w-full">
                <Markdown>{message.text}</Markdown>
            </div>
        </div>
    </div>
}