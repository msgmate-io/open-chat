import { Message, PaginatedMessageList } from '@/_api/api';
import * as toolkitRaw from '@reduxjs/toolkit';
import { RootState } from './store';
const { createSlice } = toolkitRaw.default ?? toolkitRaw;

interface MessageCache {
    [key: string]: PaginatedMessageList;
}

export interface MessagesState {
    partialMessages: { [key: string]: Message }
    chatMessages: null | MessageCache;
}
const initalMessagesState: MessagesState = {
    chatMessages: null,
    partialMessages: {},
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
        updatePartialMessage: (state: MessagesState, action) => {
            const { chatId, message } = action.payload;
            state.partialMessages[chatId] = message;
        },
        insertMessage: (state: MessagesState, action) => {
            const { chatId, message } = action.payload;
            if (chatId in (state.chatMessages ?? {})) {
                state.chatMessages[chatId].results = [
                    message,
                    ...state.chatMessages[chatId].results
                ]
            } else {
                console.warn('Chat not found', chatId, 'cannot insert message');
            }
            // Partial messages disappear when new message are arriving! Remove 'chatId' from partialMessages
            if (chatId in state.partialMessages) {
                state.partialMessages[chatId] = null;
            }
        }
    },
});

export const getMessagesByChatId = (state: RootState, chatId: string) => {
    return state.messages.chatMessages?.[chatId];
}

export const getChatPartialMessage = (state: RootState, chatId: string) => {
    return state.messages.partialMessages[chatId];
}


export const {
    fetchMessages,
    insertMessage,
    updatePartialMessage,
} = messagesSlice.actions;
