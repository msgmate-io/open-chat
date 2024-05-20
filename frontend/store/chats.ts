import { ChatResult, PaginatedChatResultList } from '#open-chat-api/api';
import * as toolkitRaw from '@reduxjs/toolkit';
import { RootState } from './store';
const { createSlice } = toolkitRaw.default ?? toolkitRaw;

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
        insertChat: (state, action) => {
            const { chat } = action.payload;
            if (state.value) {
                state.value.results = [chat, ...state.value.results.filter(c => c.uuid !== chat.uuid)];
                state.value.results = orderChats(state.value.results);
            }
        },
        deleteChat: (state, action) => {
            const { chatId } = action.payload;
            if (state.value) {
                state.value.results = state.value.results.filter(c => c.uuid !== chatId);
            }
        },
        updateChatSettings: (state, action) => {
            const { chatId, settings } = action.payload;
            if (state.value) {
                const chat = state.value.results.find(chat => chat.uuid == chatId);
                if (chat) {
                    chat.settings = settings;
                }
            }
        },
        markChatAsRead: (state, action) => {
            const { chatId } = action.payload;
            if (state.value) {
                const chat = state.value.results.find(chat => chat.uuid == chatId);
                chat.unread_count = 0;
                if (chat) {
                    chat.newest_message.read = true;
                }
            }
        },
        updateNewestMessage: (state, action) => {
            const { chatId, message } = action.payload;
            if (state.value) {
                const chat = state.value.results.find(chat => chat.uuid == chatId);
                if (chat) {
                    chat.newest_message = message;
                }
                state.value.results = orderChats(state.value.results);
            }
        },
        updatePartnerOnlineStatus: (state, action) => {
            const { userId, isOnline } = action.payload;
            if (state.value) {
                state.value.results.forEach(chat => {
                    if (chat.partner.uuid === userId) {
                        chat.partner.is_online = isOnline;
                    }
                });
            }
        }
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
    deleteChat,
    insertChat,
    markChatAsRead,
    updateChatSettings,
    updateNewestMessage,
    updatePartnerOnlineStatus
} = chatsSlice.actions;
