import { ChatResult, PaginatedChatResultList } from '@/_api/api';
import * as toolkitRaw from '@reduxjs/toolkit';
const { createSlice } = toolkitRaw.default ?? toolkitRaw;
import { RootState } from './store';

export interface ChatState {
    value: null | PaginatedChatResultList;
}

const inialChatState: ChatState = {
    value: null,
} satisfies ChatState as ChatState;

export const chatsSlice = createSlice({
    name: 'chats',
    initialState: inialChatState,
    reducers: {
        fetchChats: (state, action) => {
            state.value = action.payload;
        },
        updateNewestMessage: (state, action) => {
            const { chatId, message } = action.payload;
            if (state.value) {
                const chat = state.value.results.find(chat => chat.uuid === chatId);
                if (chat) {
                    chat.newest_message = message;
                }
                state.value.results = orderChats(state.value.results);
            }
        },
    }
});

export const orderChats = (chats: ChatResult[]) => {
    // order chats my 'newest_message.created' time
    chats.sort((a, b) => {
        return new Date(b.newest_message.created).getTime() - new Date(a.newest_message.created).getTime();
    });
    return chats
};

export const getChatByChatId = (state: RootState, chatId: string) => {
    return state.chats.value?.results?.find(chat => chat.uuid === chatId);
}

export const {
    fetchChats,
    updateNewestMessage
} = chatsSlice.actions;
