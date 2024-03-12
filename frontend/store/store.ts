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
    },
});

export const { fetchUser } = userSlice.actions;


export function getStore() {
    return configureStore({
        reducer: {
            user: userSlice.reducer,
            frontend: frontendSlice.reducer,
        },
    });
}