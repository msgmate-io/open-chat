export { guard }

import type { GuardAsync } from 'vike/types'
import { redirect } from 'vike/abort'
import { getApi } from '@/_api/client2'
import Cookies from 'js-cookie'

const guard: GuardAsync = async (pageContext): ReturnType<GuardAsync> => {
    // Guard must be client & server compatible!
    const isServer = typeof window === "undefined";
    const xcsrfToken = isServer ? pageContext.xcsrfToken : Cookies.get("csrftoken")
    const sessionToken = isServer ? false : (Cookies.get("sessionid") || false)
    if (sessionToken)
        return
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