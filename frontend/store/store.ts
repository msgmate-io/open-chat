import { Api } from '@/_api/api';
import { navigate } from '@/components/atoms/Link';
import * as toolkitRaw from '@reduxjs/toolkit';
import Cookies from "js-cookie";
import { Dispatch } from 'redux';
import { toast } from 'sonner';
import { chatsSlice, ChatState, fetchChats } from './chats';
import { contactsSlice, ContactsState } from './contacts';
import { messagesSlice, MessagesState } from './messages';
import { fetchProfile, profileSlice, ProfileState } from './profile';
import { PublicProfilesSlice, PublicProfilesState } from './publicProfiles';
import { fetchUser, userSlice, UserState } from './user';
const { createSlice, configureStore, combineReducers } = toolkitRaw.default ?? toolkitRaw;

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
    contacts: contactsSlice.reducer,
    profile: profileSlice.reducer,
    publicProfiles: PublicProfilesSlice.reducer,
})

export function getStore(initalReduxState) {
    return configureStore({
        preloadedState: initalReduxState,
        reducer: rootReducer
    });
}

export const logoutUser = (
    api: typeof Api.prototype.api
) => async (
    dispatch: Dispatch
) => {
        try {
            await api.userLogoutRetrieve();
            dispatch(fetchUser(null));
            dispatch(fetchChats(null));
            dispatch(fetchProfile(null));
            // remove helper 'clientAuthorized' flag so +guard.js may be executed client side
            Cookies.remove("clientAuthorized");
            // Just be be sure - Is normally auto removed by the 'Set-Cookie' header
            Cookies.remove("sessionid");
            setTimeout(() => {
                navigate("/");
            }, 100);
        } catch (e) {
            toast.error("Error: " + JSON.stringify(e.error)); // Assuming e has an error property
        }
    };

export type AppDispatch = typeof rootReducer.dispatch;
export interface RootState {
    user: UserState,
    chats: ChatState,
    messages: MessagesState,
    profile: ProfileState,
    pageProps: any,
    contacts: ContactsState,
    publicProfiles: PublicProfilesState,
    frontend: any,
}