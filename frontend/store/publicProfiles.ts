import { PaginatedUserProfileList } from '@/_api/api';
import * as toolkitRaw from '@reduxjs/toolkit';
const { createSlice } = toolkitRaw.default ?? toolkitRaw;

export interface PublicProfilesState {
    value: null | PaginatedUserProfileList;
}

const inialState: PublicProfilesState = {
    value: null,
} satisfies PublicProfilesState as PublicProfilesState;

export const PublicProfilesSlice = createSlice({
    name: 'contacts',
    initialState: inialState,
    reducers: {
        fetchPublicProfiles: (state, action) => {
            state.value = action.payload;
        },
        updatePublicProfilesOnlineStatus: (state, action) => {
            const { userId, isOnline } = action.payload;
            if (state.value) {
                state.value.results.forEach(profile => {
                    if (profile.uuid === userId) {
                        profile.is_online = isOnline;
                    }
                });
            }
        }
    }
});

export const {
    fetchPublicProfiles,
    updatePublicProfilesOnlineStatus,
} = PublicProfilesSlice.actions;
