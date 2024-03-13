export { guard }

import type { GuardAsync } from 'vike/types'
import { redirect } from 'vike/abort'
import { getApiServer } from '@/_api/client2'

const guard: GuardAsync = async (pageContext): ReturnType<GuardAsync> => {
    console.log("Running chat page guard")
    if (!pageContext.sessionId || !pageContext.sessionId.length) {
        throw redirect(`/login?next=${pageContext.urlOriginal}`)
    } else {
        const api = getApiServer(pageContext)
        try {
            const user = await api.userRetrieve()
            console.log("User data:", user)
        } catch (e) {
            console.log("Error fetching user data", e)
            throw redirect(`/login?next=${pageContext.urlOriginal}`)
        }
    }
}