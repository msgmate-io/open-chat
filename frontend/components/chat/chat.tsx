import { ChatResult } from "@/_api/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { navigateSearch } from "../atoms/Link";

import { useApi } from "@/_api/client2";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { deleteChat, updateChatSettings } from "@/store/chats";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { useEffect, useState } from "react";
import Markdown from 'react-markdown';
import { useDispatch } from "react-redux";
import { toast } from "sonner";

function DeleteChatButton({ dialogOpen, setDialogOpen, chat, setMarkedForDeletion }) {
    const api = useApi();
    return <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <Button variant="outline" className="h-6 w-full" onClick={(e) => {
            setDialogOpen(true);
        }}>Delete Chat</Button>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                    <div className="article prose">
                        <Markdown>
                            **This action cannot be undone.** This will permanently delete your chat
                            and remove that chats data from our servers.
                            You can also archive your chat, allowing you to restore it later.

                            If this is your only chat with a `hidden` bot you will require the bots reveal code to start a new chat.
                        </Markdown>
                    </div>
                </DialogDescription>
                <DialogFooter>
                    <Button variant="outline" className="w-full" onClick={() => {
                        api.chatsDeleteCreate(chat?.uuid).then(() => {
                            setMarkedForDeletion(true)
                        }).catch((error) => {
                            setMarkedForDeletion(false)
                            toast.error(`Failed to delete chat: ${JSON.stringify(error)}`)
                        })
                        setDialogOpen(false)
                    }}>Delete</Button>
                </DialogFooter>
            </DialogHeader>
        </DialogContent>
    </Dialog>
}


function ViewChatJsonButton({ chat }) {
    return <Dialog>
        <DialogTrigger asChild>
            <Button variant="outline" className="h-6 w-full" onClick={(e) => { }}>View Json</Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Chat-Json</DialogTitle>
                <DialogDescription>
                    <div className="article prose max-h-80 overflow-x-scroll max-w-md">
                        <Markdown>
                            {"```\n" + JSON.stringify(chat, null, 2) + "\n```"}
                        </Markdown>
                    </div>
                </DialogDescription>
            </DialogHeader>
        </DialogContent>
    </Dialog>
}

export function UnreadBadge({
    chat
}: {
    chat: ChatResult
}) {
    return chat.unread_count > 0 ? <Badge className="bg-transparent flex flex-row items-center content-center justify-center text-black h-6 w-10 px-0 hover:bg-transparent">{`${chat.unread_count}x📮`}</Badge> : <></>
}

export function OnlineIndicator({
    is_online
}: {
    is_online: boolean
}) {
    return is_online ? <Badge className="bg-transparent flex items-center content-center justify-center h-6 w-6 hover:bg-transparent">🟢</Badge> : <Badge className="bg-transparent flex items-center content-center justify-center h-6 w-6 hover:bg-transparent">🔴</Badge>
}

export function ChatSettingsContainer({ chat, open, setOpen, children }) {

    const api = useApi()
    const dispatch = useDispatch()
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [markedForDeletion, setMarkedForDeletion] = useState(false)

    const [extraName, setExtraName] = useState(chat?.settings?.title || "")
    const extraNameChanged = (extraName !== chat?.settings?.title) && extraName !== ""

    useEffect(() => {
        if (markedForDeletion) {
            dispatch(deleteChat({ chatId: chat?.uuid }))
        }
    }, [markedForDeletion])

    const onSaveExtraTitle = () => {
        api.chatsSettingsCreate(chat?.uuid, { title: extraName }).then((res) => {
            dispatch(updateChatSettings({ chatId: chat?.uuid, settings: res }))
        }).catch((error) => {
            toast.error(`Failed to save extra title: ${JSON.stringify(error)}`)
        })
    }

    const onResetExtraText = () => {
        setExtraName(chat?.settings?.title || "")
    }


    return <DropdownMenu open={open} onOpenChange={setOpen}>
        {children}
        <DropdownMenuContent className="w-56 pointer-events-none">
            <DropdownMenuLabel className="h-6">Chat Settings</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="flex flex-row gap-1">
                <Input type="text" value={extraName} onChange={(e) => setExtraName(e.target.value)} placeholder="Extra name" className="h-6" />
                {(!extraName || !extraNameChanged) && <Button className="h-6 px-1 bg-base-200 hover:bg-accent">
                    ✍️
                </Button>}
                {(extraName && extraNameChanged) && <Button className="h-6 px-1 bg-base-200 hover:bg-accent" onClick={onSaveExtraTitle}>
                    ✅
                </Button>}
                {chat?.settings?.title && !extraNameChanged && <Button className="h-6 px-1 bg-base-200 hover:bg-accent">
                    🪣
                </Button>}
                {!chat?.settings?.title && !extraNameChanged && <Button className="h-6 px-1 bg-base-200 hover:bg-accent">
                    🕳️
                </Button>}
                {extraNameChanged && <Button className="h-6 px-1 bg-base-200 hover:bg-accent" onClick={onResetExtraText}>
                    ↩
                </Button>}
            </DropdownMenuLabel>
            {chat?.partner?.is_bot && <DropdownMenuLabel>
                <DeleteChatButton chat={chat} dialogOpen={deleteDialogOpen} setDialogOpen={setDeleteDialogOpen} setMarkedForDeletion={setMarkedForDeletion} />
            </DropdownMenuLabel>}
            <DropdownMenuLabel>
                <ViewChatJsonButton chat={chat} />
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
        </DropdownMenuContent>
    </DropdownMenu>
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
    const [settingsOpen, setSettingsOpen] = useState(false)


    return (
        <>
            <ChatSettingsContainer chat={chat} open={settingsOpen} setOpen={setSettingsOpen} >
                <Card className={cn(
                    "bg-base-200 hover:bg-base-300 p-0",
                    settingsOpen && "bg-accent bg-opacity-10 pointer-events-none hover:bg-opacity-10",
                    isSelected && "bg-accent bg-opacity-10 hover:bg-opacity-10"
                )} key={chat.uuid} onClick={() => {
                    if (!settingsOpen) {
                        navigateSearch({ chat: chat.uuid })
                    }
                }}>
                    <CardHeader className="p-2">
                        <CardTitle className="flex flex-row">
                            <div className="flex flex-grow">{chat?.settings?.title ? chat?.settings?.title : `${chat.partner.first_name} ${chat.partner.second_name}`}</div>
                            <div className="relative bg-error">
                                <div className="absolute right-0 flex flex-row">
                                    <UnreadBadge chat={chat} />
                                    <OnlineIndicator is_online={chat?.partner?.is_online} />
                                    <Button className="flex h-6 w-6 px-0 content-center items-center justify-center bg-transparent hover:bg-base-200" onClick={(e) => {
                                        setSettingsOpen(!settingsOpen)
                                        e.stopPropagation()
                                    }}>⚙</Button>
                                </div>
                            </div>
                        </CardTitle>
                        <CardDescription className="flex text-nowrap whitespace-nowrap overflow-x-hidden">{chat.newest_message.text}</CardDescription>
                    </CardHeader>
                </Card>
                <DropdownMenuTrigger className="h-0 bg-error z-10 display-none"></DropdownMenuTrigger>
            </ChatSettingsContainer>
        </>
    )
}