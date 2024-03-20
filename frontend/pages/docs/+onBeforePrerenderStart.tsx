export { onBeforePrerenderStart }

import type { OnBeforePrerenderStartAsync } from 'vike/types'

import { docsConfig } from './config'

const onBeforePrerenderStart: OnBeforePrerenderStartAsync = async (
): ReturnType<OnBeforePrerenderStartAsync> => {
    return docsConfig.sidebarNav[0].items.map((item) => {
        return `/docs${item.href}`
    })
}