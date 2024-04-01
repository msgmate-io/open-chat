import { ChatResult } from "@/_api/api";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { navigateSearch } from "../atoms/Link";

export function UnreadBadge({
    chat
}: {
    chat: ChatResult
}) {
    return chat.unread_count > 0 ? <Badge variant="outline" className="ml-1 border-accent text-accent h-4">{chat.unread_count}</Badge> : null
}

export function OnlineIndicator({
    is_online
}: {
    is_online: boolean
}) {
    return is_online ? <Badge variant="outline" className="ml-1 border-accent text-accent h-4">online</Badge> : <Badge variant="outline" className="ml-1 border-error text-accent h-4">Offline</Badge>
}

export function PendingChatItem() {
    return <Card className="bg-base-200 animate-pulse hover:bg-base-300 p-0 flex" key={"chatListHeader"}>
        <CardHeader className="p-2">
            <CardTitle><span className="shadow text-base-300">{"...    "}</span></CardTitle>
            <CardDescription className="flex text-nowrap whitespace-nowrap overflow-x-hidden text-base-300">{"...."}</CardDescription>
        </CardHeader>
    </Card>
}

export function ChatItem({ chat, isSelected = false }: {
    chat: ChatResult,
    isSelected?: boolean
}) {
    return (
        <Card className={cn(
            "bg-base-200 hover:bg-base-300 p-0",
            isSelected && "bg-accent bg-opacity-10 hover:bg-opacity-10"
        )} key={chat.uuid} onClick={() => {
            navigateSearch({ chat: chat.uuid })
        }}>
            <CardHeader className="p-2">
                <CardTitle>{chat.partner.first_name} {chat.partner.second_name}<UnreadBadge chat={chat} /><OnlineIndicator is_online={chat?.partner?.is_online} /></CardTitle>
                <CardDescription className="flex text-nowrap whitespace-nowrap overflow-x-hidden">{chat.newest_message.text}</CardDescription>
            </CardHeader>
        </Card>
    )
}