import * as toolkitRaw from '@reduxjs/toolkit';
const { createSlice, configureStore, combineReducers } = toolkitRaw.default ?? toolkitRaw;
import { chatsSlice, ChatState } from './chats';
import { messagesSlice, MessagesState } from './messages';
import { UserState, userSlice } from './user';
import { profileSlice, ProfileState } from './profile';

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

export const { fetchFrontend, changeTheme } = frontendSlice.actions;
export const { fetchPageProps } = pagePropsSlice.actions;

const rootReducer = combineReducers({
    user: userSlice.reducer,
    frontend: frontendSlice.reducer,
    pageProps: pagePropsSlice.reducer,
    chats: chatsSlice.reducer,
    messages: messagesSlice.reducer,
    profile: profileSlice.reducer,
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
    profile: ProfileState,
    pageProps: any,
    frontend: any,
}