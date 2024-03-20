export { onBeforePrerenderStart }

import type { OnBeforePrerenderStartAsync } from 'vike/types'

import { pages } from './config'

const onBeforePrerenderStart: OnBeforePrerenderStartAsync = async (
): ReturnType<OnBeforePrerenderStartAsync> => {
    return pages.map((page) => {
        return `/docs/${page.route}`
    })
}