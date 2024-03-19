export { guard }

import type { GuardAsync } from 'vike/types'
import { redirect } from 'vike/abort'
import { getApi } from '@/_api/client2'
import Cookies from 'js-cookie'

const guard: GuardAsync = async (pageContext): ReturnType<GuardAsync> => {
    const isServer = typeof window === "undefined";
    if (!isServer) {
        // The guard is meant for servier side only!
        return
    }
    const xcsrfToken = isServer ? pageContext.xcsrfToken : Cookies.get("csrftoken")
    const api = getApi({
        cookie: isServer ? pageContext.cookies : null,
        xcsrfToken,
    })
    try {
        const user = await api.userRetrieve()
    } catch (e) {
        throw redirect(`/login?next=${pageContext.urlOriginal}`)
    }
}