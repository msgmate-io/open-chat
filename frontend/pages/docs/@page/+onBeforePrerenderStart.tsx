export { onBeforePrerenderStart }

import type { OnBeforePrerenderStartAsync } from 'vike/types'

import { ROUTE_PREFIX } from '@/renderer/constants'
import { pages } from '../config'

const onBeforePrerenderStart: OnBeforePrerenderStartAsync = async (
): ReturnType<OnBeforePrerenderStartAsync> => {
    const urls = pages.map((page) => {
        return `/docs/${page.route}`
    })
    console.log("URL", urls)
    return urls
}

