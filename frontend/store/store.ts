import { UserSelf } from '@/_api/api';
import * as toolkitRaw from '@reduxjs/toolkit';
const { createSlice, configureStore, combineReducers } = toolkitRaw.default ?? toolkitRaw;
import { chatsSlice, ChatState } from './chats';
import { messagesSlice, MessagesState } from './messages';

interface UserState {
    value: null | UserSelf;
}
const inialUserState: UserState = {
    value: null,
} satisfies UserState as UserState;

const userSlice = createSlice({
    name: 'user',
    initialState: inialUserState,
    reducers: {
        fetchUser: (state, action) => {
            console.log('fetchUser', action.payload);
            state.value = action.payload;
        },
    },
});

const frontendSlice = createSlice({
    name: 'frontend',
    initialState: null,
    reducers: {
        fetchFrontend: (state, action) => {
            state = action.payload;
        },
        changeTheme: (state, action) => {
            state.theme = action.payload;
        }
    },
});


const pagePropsSlice = createSlice({
    name: 'pageProps',
    initialState: {},
    reducers: {
        fetchPageProps: (state, action) => {
            state = action.payload;
        },
    },
});


export const { fetchUser } = userSlice.actions;
export const { fetchChats } = chatsSlice.actions;
export const { fetchFrontend, changeTheme } = frontendSlice.actions;
export const { fetchPageProps } = pagePropsSlice.actions;
export const { fetchMessages } = messagesSlice.actions;

const rootReducer = combineReducers({
    user: userSlice.reducer,
    frontend: frontendSlice.reducer,
    pageProps: pagePropsSlice.reducer,
    chats: chatsSlice.reducer,
    messages: messagesSlice.reducer,
})

export function getStore(initalReduxState) {
    return configureStore({
        preloadedState: initalReduxState,
        reducer: rootReducer
    });
}

export interface RootState {
    user: UserState,
    chats: ChatState,
    messages: MessagesState,
    pageProps: any,
    frontend: any,
}