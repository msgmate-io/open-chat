import { useApi } from "@/_api/client2";
import { fetchMessages } from "@/store/messages";
import { RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export function ChatMessagesLoader({ chatId }) {
    const api = useApi();
    const dispatch = useDispatch();
    const chatMessages = useSelector((state: RootState) => state.messages.chatMessages);
    useEffect(() => {
        if (chatId && !chatMessages?.[chatId]) {
            api.messagesList({
                chatUuid: chatId,
                page_size: 20
            }).then((messages) => {
                dispatch(fetchMessages({ chatId, messages }));
            })
        }

    }, [chatId]);
    return null
}