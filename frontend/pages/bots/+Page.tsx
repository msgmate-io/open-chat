import { UserLoader } from "#open-chat-ui/loaders/UserLoader";
import { AudioRecorder } from "./AudioRecorder";

export function Page() {
    return <>
        <UserLoader />
        <AudioRecorder />
        <>Heloo</>
    </>;
}