export { guard }

import Cookies from 'js-cookie'
import { redirect } from 'vike/abort'
import type { GuardAsync } from 'vike/types'

const guard: GuardAsync = async (pk): ReturnType<GuardAsync> => {
    if (typeof window !== undefined && Cookies.get("clientAuthorized")) {
        return
    } else if (!pk.sessionId) {
        throw redirect(`/login?next=${pk.urlOriginal}`)
    }
}