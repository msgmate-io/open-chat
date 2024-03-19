import { PaginatedChatResultList } from '@/_api/api';
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
            }
        },
    }
});

export const getChatByChatId = (state: RootState, chatId: string) => {
    return state.chats.value?.results?.find(chat => chat.uuid === chatId);
}

export const {
    fetchChats,
    updateNewestMessage
} = chatsSlice.actions;
