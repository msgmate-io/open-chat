export { guard };
import { DOCS_AT_INDEX } from "../../renderer/constants";

import { redirect } from 'vike/abort';
import type { GuardAsync } from 'vike/types';

const guard: GuardAsync = async (pk): ReturnType<GuardAsync> => {
    console.log("GUARD", pk.sessionId, typeof window)
    if (typeof window === 'undefined' && pk.sessionId) {
        // if we are server side and we see ther user is already logged in, directly redirect him to /chat
        if (DOCS_AT_INDEX)
            return // special case TODO: depricate when docs are severed seperately
        throw redirect(`/chat`);
    }
}