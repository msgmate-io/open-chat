import {
    Card,
} from "@/components/ui/card"
import logo from "@/assets/logo.png";
import { navigateSearch } from "../atoms/Link";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { ChatItem } from "./chat";
import ProfileLoader from "../loaders/ProfileLoader";

function NewChatCard() {

    return <Card className="bg-base-200 hover:bg-base-300 p-0 flex" key={"chatListHeader"}>
        <div className="flex">
            <img src={logo} className="h-12" alt="logo" />
        </div>
        <div className="flex flex-grow items-center content-center justify-start pr-2" onClick={() => {
            navigateSearch({ chat: null })
        }}>
            <div className="p-2 flex flex-grow">New Chat</div>
            <div>✍️</div>
        </div>
    </Card>
}

function UserCard() {
    const profile = useSelector((state: RootState) => state.profile.value)

    return <>
        <ProfileLoader />
        <Card className="bg-base-200 hover:bg-base-300 p-0 flex" key={"chatListHeader"}>
            <div className="flex">
                <img src={logo} className="h-12" alt="logo" />
            </div>
            <div className="flex flex-grow items-center content-center justify-start pr-2">
                <div className="p-2 flex flex-grow">{profile?.first_name} {profile?.second_name}</div>
                <div>✍️</div>
            </div>
        </Card>
    </>
}

export function ChatsList() {
    const chats = useSelector((state: RootState) => state.chats.value)
    const chatId = useSelector((state: RootState) => state.pageProps.search?.chat)
    return <div className="flex flex-col gap-2 h-full">
        <NewChatCard />
        <div className="flex flex-col flex-grow gap-2 overflow-y-scroll">{
            chats ? chats.results?.map(chat => <ChatItem chat={chat} key={`chat_${chat.uuid}`} isSelected={chat.uuid === chatId} />) : <div>Loading...</div>
        }</div>
        <UserCard />
    </div>
}