import { PaginatedUserProfileList } from '@/_api/api';
import * as toolkitRaw from '@reduxjs/toolkit';
const { createSlice } = toolkitRaw.default ?? toolkitRaw;

export interface ContactsState {
    value: null | PaginatedUserProfileList;
}

const inialState: ContactsState = {
    value: null,
} satisfies ContactsState as ContactsState;

export const contactsSlice = createSlice({
    name: 'contacts',
    initialState: inialState,
    reducers: {
        fetchContacts: (state, action) => {
            state.value = action.payload;
        },
    }
});

export const {
    fetchContacts,
} = contactsSlice.actions;
