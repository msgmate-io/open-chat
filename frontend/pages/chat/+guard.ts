export { guard }

import Cookies from 'js-cookie'
import { redirect } from 'vike/abort'
import type { GuardAsync } from 'vike/types'
import { IS_NATIVE } from '../../renderer/constants'

const guard: GuardAsync = async (pk): ReturnType<GuardAsync> => {
    if (IS_NATIVE) {
        // check if electron
        return
    }
    if (typeof window !== undefined && Cookies.get("clientAuthorized")) {
        return
    } else if (!pk.sessionId) {
        throw redirect(`/login?next=${pk.urlOriginal}`)
    }
}