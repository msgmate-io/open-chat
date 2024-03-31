import { ChatResult } from "@/_api/api";
import { useApi } from "@/_api/client2";
import logo from "@/assets/logo.png";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { getChatByChatId, updateNewestMessage } from "@/store/chats";
import { getMessagesByChatId, insertMessage } from "@/store/messages";
import { RootState } from "@/store/store";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { navigateSearch } from "../atoms/Link";
import ContactsLoader from "../loaders/ContactsLoader";
import { ChatMessagesLoader } from "../loaders/MessagesLoader";
import PublicProfilesLoader from "../loaders/PublicProfilesLoader";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { MessageItem } from "./message";

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

export function ContactsList() {
    const contacts = useSelector((state: RootState) => state.contacts.value)

    return <div className="flex flex-col h-full w-full content-center items-center">
        {!contacts && <div>Loading...</div>}
        {contacts && <div className="flex flex-wrap gap-2 w-full items-center content-center justify-center">{
            contacts.results?.map(
                (contact, i) => <Card className="w-60 p-4 hover:bg-base-200" key={`contact_${i}`}>{contact.first_name}</Card>)
        }</div>}
    </div>
}


export function PublicProfilesList() {
    const publicProfiles = useSelector((state: RootState) => state.publicProfiles.value)

    return <div className="flex flex-col h-full w-full content-center items-center">
        {!publicProfiles && <Carousel
            opts={{
                align: "start",
            }}
            className="w-full max-w-[800px]"
        >
            <CarouselContent>
                {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index} className="lg:basis-1/3">
                        <div className="p-1">
                            <Card className="pulse bg-base-200">
                                <CardContent className="pulse flex aspect-square items-center justify-center p-6">
                                    loading
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>}
        {publicProfiles && <Carousel
            opts={{
                align: "start",
            }}
            className="w-full max-w-[800px]"
        >
            <CarouselContent>
                {publicProfiles.results?.map((profile, index) => (
                    <CarouselItem key={index} className="lg:basis-1/3">
                        <div className="p-1">
                            <Card className="hover:bg-base-200">
                                <CardContent className="flex flex-col aspect-square items-center justify-center p-6 gap-2">
                                    <span className="text-3xl font-semibold">{profile.first_name}</span>
                                    <span className="font-semibold">{profile.description_title}</span>
                                    <span className="w-full text-center">{profile.description}</span>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
        }
    </div>
}

export function NewChatCard() {
    return <div className="flex flex-col h-full w-full content-center items-center">
        <ContactsLoader />
        <PublicProfilesLoader />
        <div className="w-full flex items-center content-center justify-left">
            <MobileBackButton />
        </div>
        <main className="flex w-full text-3xl md:text-4xl lg:w-8/12 font-bold content-center justify-center items-center p-6">
            <h1 className="inline">
                Start a new{" "}
                <span className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
                    (AI-)Chat ?
                </span>{" "}
            </h1>
        </main>
        <h1 className="text-2xl font-bold py-2">Public Profiles</h1>
        <PublicProfilesList />
        <h1 className="text-2xl font-bold py-2">Past Contacts</h1>
        <ContactsList />
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