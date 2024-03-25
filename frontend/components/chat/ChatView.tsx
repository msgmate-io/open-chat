import {
    Card,
} from "@/components/ui/card"
import logo from "@/assets/logo.png";
import { navigate, navigateSearch } from "../atoms/Link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { ChatItem } from "./chat";
import ProfileLoader from "../loaders/ProfileLoader";
import { Button } from "@/components/ui/button"
import { logoutUser } from "@/store/store";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useApi } from "@/_api/client2";
import ThemeSelector from "@/components/atoms/ThemeSelector";

function NewChatCard() {

    return <Card className="bg-base-200 hover:bg-base-300 p-0 flex drop-shadow-xl z-10" key={"chatListHeader"}>
        <div className="flex">
            <img src={logo} className="h-12" alt="logo" />
        </div>
        <div className="flex flex-grow items-center content-center justify-start pr-2" onClick={() => {
            navigateSearch({ chat: "new" })
        }}>
            <div className="p-2 flex flex-grow">New Chat</div>
            <div>✍️</div>
        </div>
    </Card>
}

function ProfileCardButton() {
    const profile = useSelector((state: RootState) => state.profile.value)

    return <>
        <ProfileLoader />
        <DropdownMenuTrigger asChild>
            <Card className="bg-base-200 hover:bg-base-300 p-0 flex" key={"chatListHeader"}>
                <div className="flex">
                    <img src={logo} className="h-12" alt="logo" />
                </div>
                <div className="flex flex-grow items-center content-center justify-start pr-2">
                    <div className="p-2 flex flex-grow">{profile?.first_name} {profile?.second_name}</div>
                    <div>✍️</div>
                </div>
            </Card>
        </DropdownMenuTrigger>
    </>
}

function ProfileMenu() {
    const api = useApi();
    const dispatch: AppDispatch = useDispatch()
    const onLogout = () => {
        dispatch(logoutUser(api))
    }
    return <div className="shadow-xl">
        <DropdownMenu>
            <ProfileCardButton />
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Home Page</DropdownMenuItem>
                <DropdownMenuItem>Docs</DropdownMenuItem>
                <DropdownMenuLabel><ThemeSelector /></DropdownMenuLabel>
                <DropdownMenuItem disabled>API</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout}>
                    Log out
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
}


export function ChatsList() {
    const chats = useSelector((state: RootState) => state.chats.value)
    const chatId = useSelector((state: RootState) => state.pageProps.search?.chat)
    return <div className="flex flex-col gap-0 h-full">
        <NewChatCard />
        <div className="flex flex-col flex-grow gap-2 overflow-y-scroll py-2">{
            chats ? chats.results?.map(chat => <ChatItem chat={chat} key={`chat_${chat.uuid}`} isSelected={chat.uuid === chatId} />) : <div>Loading...</div>
        }</div>
        <ProfileMenu />
    </div>
}