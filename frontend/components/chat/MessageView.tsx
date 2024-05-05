import { useApi } from "@/_api/client2";
import logo from "@/assets/logo.png";
import { Badge } from "@/components/ui/badge";
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
import { getChatByChatId, insertChat, markChatAsRead, updateNewestMessage } from "@/store/chats";
import { getChatPartialMessage, getMessagesByChatId, insertMessage, markChatMessagesAsRead } from "@/store/messages";
import { RootState } from "@/store/store";
import { forwardRef, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { navigateSearch } from "../atoms/Link";
import ContactsLoader from "../loaders/ContactsLoader";
import { ChatMessagesLoader } from "../loaders/MessagesLoader";
import PublicProfilesLoader from "../loaders/PublicProfilesLoader";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { OnlineIndicator } from "./chat";
import { MessageItem } from "./message";


interface MessageViewInputProps {
    isLoading?: boolean,
    onSendMessage?: () => void
}

export const MessageViewInput = forwardRef<
    HTMLTextAreaElement,
    MessageViewInputProps
>(({ isLoading = false, onSendMessage = () => { } }, ref) => {
    const [text, setText] = useState("");

    useEffect(() => {
        if (ref.current) {
            ref.current.style.height = 'inherit';
            const scrollHeight = ref.current.scrollHeight;
            ref.current.style.height = `${scrollHeight}px`;
        }
    }, [ref, text]);

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    return (
        <Card className="bg-base-200 hover:bg-base-300 p-0 flex" key={"chatListHeader"}>
            <div className="flex">
                <img src={logo} className="h-12" alt="logo" />
            </div>
            <div className="flex flex-grow items-center content-center justify-start pr-2 relative py-2">
                <Textarea
                    value={text}
                    placeholder="Type a message..."
                    onChange={handleTextChange}
                    style={{
                        resize: "none",
                        height: "auto",
                        overflow: "auto"
                    }}
                    ref={ref}
                />
                <Button onClick={onSendMessage} disabled={isLoading}>
                    <div>✍️</div>
                    Send
                </Button>
            </div>
        </Card>
    );
});


function MessageScrollView({ chatId, chat }) {
    const scrollRef = useRef<HTMLDivElement>(null)
    const messages = useSelector((state: RootState) => getMessagesByChatId(state, chatId))
    const partialMessage = useSelector((state: RootState) => getChatPartialMessage(state, chatId))
    const user = useSelector((state: RootState) => state.user.value)
    const isLoading = chatId && !messages
    const inputRef = useRef<HTMLTextAreaElement>(null)

    const [sendIsLoading, setSendIsLoading] = useState(false)

    const api = useApi()
    const dispatch = useDispatch()

    const scrollToBottom = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages, partialMessage])

    const onSendMessage = () => {
        setSendIsLoading(true)
        api.messagesSendCreate(chat.uuid, { text: inputRef.current?.value }).then((res) => {
            dispatch(insertMessage({ chatId: chat.uuid, message: res }))
            dispatch(updateNewestMessage({ chatId: chat.uuid, message: res }))
            setTimeout(() => {
                scrollToBottom()
                setSendIsLoading(false)
            }, 50)
        }).catch((err) => {
            setSendIsLoading(false)
            toast.error(`Failed to send message: ${err}`)
        })
    }

    return <div className="flex flex-col h-full w-full lg:max-w-[900px] relativ">
        <div ref={scrollRef} className="flex flex-col flex-grow gap-2 items-center content-center overflow-y-scroll">
            {chatId}
            {isLoading && <div>Loading...</div>}
            {messages && messages.results.map((message) => <MessageItem key={`msg_${message.uuid}`} message={message} chat={chat} selfIsSender={user?.uuid === message.sender} />).reverse()}
            {partialMessage && <MessageItem key={`msg_${partialMessage.uuid}`} message={partialMessage} chat={chat} selfIsSender={user?.uuid === partialMessage.sender} />}
        </div>
        <MessageViewInput isLoading={sendIsLoading || isLoading} onSendMessage={onSendMessage} ref={inputRef} />
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

    const onClickProfile = (profile) => {
        navigateSearch({ chat: "create", userId: profile.uuid })
    }

    return <div className="flex flex-col h-full w-full content-center items-center">
        {!contacts && <div>Loading...</div>}
        {contacts && <div className="flex flex-wrap gap-2 w-full items-center content-center justify-center">{
            contacts.results?.map(
                (contact, i) => <Card onClick={() => {
                    onClickProfile(contact)
                }} className="w-60 p-4 hover:bg-base-200" key={`contact_${i}`}>{contact.first_name}</Card>)
        }</div>}
    </div>
}


export function PublicProfilesList() {
    const publicProfiles = useSelector((state: RootState) => state.publicProfiles.value)

    const onClickProfile = (profile) => {
        navigateSearch({ chat: "create", userId: profile.uuid })
    }

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
                    <CarouselItem key={index} className="lg:basis-1/3" onClick={() => onClickProfile(profile)}>
                        <div className="p-1">
                            <Card className="hover:bg-base-200">
                                <CardContent className="flex flex-col aspect-square items-center justify-center p-6 gap-2">
                                    <OnlineIndicator is_online={profile.is_online} />
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

export function PassKeyRequiredIndicator({
    is_required
}) {
    return <Badge variant="outline" className={`ml-1 border-${is_required ? "error" : "success"} text-accent h-4`}>{is_required ? "requires passkey" : "no passkey required"}</Badge>
}

export function CreateChatCard({ userId }) {
    const api = useApi()
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)
    const [profile, setProfile] = useState(null)
    const revealSecret = useSelector((state: RootState) => state.pageProps.search?.reveal)
    const key = useSelector((state: RootState) => state.pageProps.search?.key)


    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        setIsLoading(true)
        api.profileRetrieve({
            userUuid: userId,
            reveal_secret: revealSecret
        }).then((res) => {
            console.log("PROFILE", res)
            setProfile(res)
            setIsLoading(false)
        }).catch((err) => {
            toast.error(`Failed to fetch profile: ${JSON.stringify(err)}`)
        });
    }, []);

    const [password, setPassword] = useState("")
    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const onCreateChat = (text) => {
        api.profileCreateChatCreate({
            userUuid: userId,
            contact_secret: password,
            reveal_secret: revealSecret
        }, { text }).then((res) => {
            dispatch(insertChat({
                chat: res.chat,
            }))
            dispatch(insertMessage({
                chatId: res.chat.uuid,
                message: res.message
            }))

            setTimeout(() => {
                navigateSearch({ chat: res.chat.uuid })
            }, 50)
        }).catch((err) => {
            toast.error(`Failed to create chat: ${JSON.stringify(err)}`)
        })
    }

    return <>
        <div className="flex flex-col h-full w-full content-center items-center">
            <div className="w-full flex items-center content-center justify-left">
                <div className="absolute top-0 mt-2 ml-2">
                    <Card className="bg-base-200 hover:bg-base-300 p-0 flex" key={"chatListHeader"}>
                        <div className="flex">
                        </div>
                        <div className="flex flex-grow items-center content-center justify-start pr-2">
                            <div>
                                👾
                            </div>
                        </div>
                    </Card>
                </div>
                <MobileBackButton />
            </div>
            <div className="flex flex-col h-full w-full lg:max-w-[900px] relativ">
                <div className="flex flex-col flex-grow gap-2 items-center content-center overflow-y-scroll">

                    <div className="w-full flex items-center content-center justify-left">
                        <MobileBackButton />
                    </div>
                    <main className="flex flex-col w-full text-3xl md:text-4xl lg:w-8/12 font-bold content-center justify-center items-center p-6">
                        <h1 className="inline">
                            Start Chat With{" "}
                            <span className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
                                {userId}
                            </span>{" "}
                        </h1>
                    </main>
                    <OnlineIndicator is_online={profile?.is_online} />
                    {isLoading && <div>Loading...</div>}
                    <h2 className="text-xl font-bold py-2">
                        {profile?.first_name} {profile?.second_name}
                    </h2>
                    <h2 className="text-xl font-bold py-2">
                        {profile?.description_title}
                    </h2>
                    <p className="text-lg">
                        {profile?.description}
                    </p>
                    <PassKeyRequiredIndicator is_required={profile?.reqires_contact_password} />
                    <Input defaultValue={key} onChange={onChangePassword} placeholder={profile?.reqires_contact_password ? "Enter Password" : "No password required"} disabled={!profile?.reqires_contact_password} className="max-w-80" />
                </div>
                <Card className="bg-base-200 hover:bg-base-300 p-0 flex" key={"chatListHeader"}>
                    <div className="flex">
                        <img src={logo} className="h-12" alt="logo" />
                    </div>
                    <div className="flex flex-grow items-center content-center justify-start pr-2">
                        <div className="p-2 flex flex-grow">
                            <Input ref={inputRef} placeholder="Type a message..." disabled={false} />
                        </div>
                        <Button onClick={() => {
                            onCreateChat(inputRef.current?.value)
                        }} disabled={false}  >
                            <div>✍️</div>
                            Send
                        </Button>
                    </div>
                </Card>

            </div>
        </div>
    </>
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
    const api = useApi()
    const dispatch = useDispatch()

    useEffect(() => {
        api.messagesReadCreate(chatId).then((res) => {
            dispatch(markChatMessagesAsRead({ chatId }))
            dispatch(markChatAsRead({ chatId }))
        }).catch((err) => {
            toast.error(`Failed to mark messages as read: ${JSON.stringify(err)}`)
        })
    }, [chatId])

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