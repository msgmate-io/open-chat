import * as toolkitRaw from '@reduxjs/toolkit';
const { createSlice } = toolkitRaw.default ?? toolkitRaw;
import { PaginatedMessageList } from '@/_api/api';
import { RootState } from './store';

interface MessageCache {
    [key: string]: PaginatedMessageList;
}

export interface MessagesState {
    chatMessages: null | MessageCache;
}
const initalMessagesState: MessagesState = {
    chatMessages: null,
} satisfies MessagesState as MessagesState;

interface FetchMessagesAction {
    type: 'fetchMessages';
    payload: {
        chatId: string;
        messages: PaginatedMessageList;
    }
}

export const messagesSlice = createSlice({
    name: 'messages',
    initialState: initalMessagesState,
    reducers: {
        fetchMessages: (state: MessagesState, action: FetchMessagesAction) => {
            state.chatMessages = {
                ...state.chatMessages,
                [action.payload.chatId]: action.payload.messages,
            };
        },
    },
});

export const getMessagesByChatId = (state: RootState, chatId: string) => {
    return state.messages.chatMessages?.[chatId];
}