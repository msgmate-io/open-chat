import WebsocketBridge from "#open-chat-ui/atoms/WebsocketBridge";
import { MessagesView } from "#open-chat-ui/chat/MessageView";
import { UserLoader } from "#open-chat-ui/loaders/UserLoader";
import { RootState } from "#open-chat-ui/store/store";
import { useSelector } from "react-redux";
import { AudioRecorder } from "./AudioRecorder";

function PageContent() {

    const chatId = useSelector((state: RootState) => state.pageProps.search?.chatId)
    const botId = useSelector((state: RootState) => state.pageProps.search?.botId)

    return <>
        <UserLoader />
        <div className="flex flex-row h-screen w-screen">
            <AudioRecorder
                chatId={chatId}
                recipientId={botId}
            />
            <div>
                <>ChatID: {chatId}, BotId: {botId}</>
                <MessagesView chatId={chatId} />
            </div>
        </div>
    </>
}

export function Page() {
    // http://localhost/bots?chatId=403bc167-6595-49b0-807c-e21dd542d981&botId=50dbe5ea-3d62-4aa1-8fbb-1446b0f5b6c3

    return <WebsocketBridge>
        <PageContent />
    </WebsocketBridge>
}