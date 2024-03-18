import { useApi } from "@/_api/client2";
import { RootState } from "@/store/store";
import { fetchMessages } from "@/store/messages";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export function ChatMessagesLoader({ chatId }) {
    const api = useApi();
    const dispatch = useDispatch();
    const chatMessages = useSelector((state: RootState) => state.messages.chatMessages);
    console.log('chatMessages', chatMessages, chatId);
    useEffect(() => {
        if (chatId && !chatMessages?.[chatId]) {
            api.messagesList2({
                chatUuid: chatId,
                page_size: 20
            }).then((messages) => {
                dispatch(fetchMessages({ chatId, messages }));
            })
        }

    }, [chatId]);
    return null
}