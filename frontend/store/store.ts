import * as toolkitRaw from '@reduxjs/toolkit';
const { createSlice, configureStore } = toolkitRaw.default ?? toolkitRaw;

const userSlice = createSlice({
    name: 'user',
    initialState: {
        value: null,
    },
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


export function getStore(initalReduxState) {
    return configureStore({
        preloadedState: initalReduxState,
        reducer: {
            user: userSlice.reducer,
            frontend: frontendSlice.reducer,
        },
    });
}