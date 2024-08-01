import { Chat, useUser } from "@open-chat/open-chat-ui";

export function Page() {
    const { } = useUser();

    return <>
        <Chat />
    </>;
}