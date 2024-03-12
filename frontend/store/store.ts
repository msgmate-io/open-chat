import { configureStore, createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        fetchUser: (state, action) => {
            state = action.payload;
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


export function getStore(initalReduxState) {
    return configureStore({
        preloadedState: initalReduxState,
        reducer: {
            user: userSlice.reducer,
            frontend: frontendSlice.reducer,
        },
    });
}