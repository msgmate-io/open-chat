export default ChatsLoader;

import { useApi } from "@/_api/client2";
import { fetchChats } from "@/store/chats";
import { RootState } from "@/store/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function ChatsLoader() {
    const api = useApi();
    const dispatch = useDispatch();
    const chats = useSelector((state: RootState) => state.chats.value);
    useEffect(() => {
        if (!chats) {
            api.chatsList({
                page_size: 20
            }).then((chats) => {
                dispatch(fetchChats(chats));
            })
        }
    }, []);
    return null
}