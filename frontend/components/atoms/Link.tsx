import { ROUTE_PREFIX } from "@/renderer/constants";
import { forwardRef } from "react";
import { navigate as vikeNavigate } from "vike/client/router";

export const Link = forwardRef(({ ...props }, innerRef) => {
    let href = props.href;
    if (props.href?.startsWith("/")) {
        href = ROUTE_PREFIX + props.href;
    }
    const children = props.children;
    delete props.href;
    delete props.children;

    return <a ref={innerRef} href={href} {...props}>{children}</a>;
});

export function navigate(href, props = {}) {
    if (href.startsWith("/")) {
        href = ROUTE_PREFIX + href;
    }
    vikeNavigate(href, props);
}

export function navigateSearch(search, resetAll = true) {
    let searchParams = new URLSearchParams(window.location.search);
    if (resetAll) {
        searchParams.forEach((_, key) => {
            searchParams.delete(key);
        });
        searchParams = new URLSearchParams();
    }
    Object.keys(search).forEach(key => {
        if (search[key] == null) {
            if (key in search) {
                searchParams.delete(key);
            }
            delete search[key];
        } else {
            searchParams.set(key, search[key])
        }
    });
    var newRelativePathQuery = window.location.pathname + '?' + searchParams.toString();
    vikeNavigate(newRelativePathQuery);
}
