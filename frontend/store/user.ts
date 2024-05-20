
import { UserSelf } from '#open-chat-api/api';
import * as toolkitRaw from '@reduxjs/toolkit';
const { createSlice } = toolkitRaw.default ?? toolkitRaw;

export interface UserState {
    value: null | UserSelf;
}
const inialUserState: UserState = {
    value: null,
} satisfies UserState as UserState;

export const userSlice = createSlice({
    name: 'user',
    initialState: inialUserState,
    reducers: {
        fetchUser: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { fetchUser } = userSlice.actions;