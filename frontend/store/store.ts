import { UserSelf } from '@/_api/api';
import * as toolkitRaw from '@reduxjs/toolkit';
const { createSlice, configureStore } = toolkitRaw.default ?? toolkitRaw;

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

export const { fetchUser } = userSlice.actions;

export const { fetchFrontend, changeTheme } = frontendSlice.actions;

const rootReducer = toolkitRaw.combineReducers({
    user: userSlice.reducer,
    frontend: frontendSlice.reducer,
})

export function getStore(initalReduxState) {
    return configureStore({
        preloadedState: initalReduxState,
        reducer: rootReducer
    });
}

export interface RootState {
    user: UserState,
    frontend: any,
}