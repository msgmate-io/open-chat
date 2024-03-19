import { ChatResult } from "@/_api/api";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { navigateSearch } from "../atoms/Link";
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils";

export function UnreadBadge({
    chat
}: {
    chat: ChatResult
}) {
    return chat.unread_count > 0 ? <Badge variant="outline" className="ml-1 border-accent text-accent">{chat.unread_count}</Badge> : null
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
                <CardTitle>{chat.partner.first_name} {chat.partner.second_name}<UnreadBadge chat={chat} /></CardTitle>
                <CardDescription className="flex text-nowrap whitespace-nowrap overflow-x-hidden">{chat.newest_message.text}</CardDescription>
            </CardHeader>
        </Card>
    )
}