export { guard };
import { DOCS_AT_INDEX, IS_NATIVE } from "../../renderer/constants";

import { redirect } from 'vike/abort';
import type { GuardAsync } from 'vike/types';

const guard: GuardAsync = async (pk): ReturnType<GuardAsync> => {
    console.log("GUARD", pk.sessionId, typeof window)
    // if native we have to check window.electronAPI.isClientAuthorized()
    if (IS_NATIVE) {
        const isClientAuthorized = window.electronAPI.isClientAuthorized(null)
        console.log("IS_NATIVE, check auth", window.location.origin, isClientAuthorized)
    }

    if (typeof window === 'undefined' && pk.sessionId) {
        // if we are server side and we see ther user is already logged in, directly redirect him to /chat
        if (DOCS_AT_INDEX)
            return // special case TODO: depricate when docs are severed seperately
        throw redirect(`/chat`);
    }
}