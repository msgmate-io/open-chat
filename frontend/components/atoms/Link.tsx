import { ROUTE_PREFIX } from "@/renderer/constants";
import { navigate as vikeNavigate } from "vike/client/router";

export function Link({ ...props }) {
    let href = props.href;
    console.log("props.href", props.href, ROUTE_PREFIX);
    if (props.href?.startsWith("/")) {
        href = ROUTE_PREFIX + props.href;
    }
    const children = props.children;
    delete props.href;
    delete props.children;
    return <a href={href} {...props}>{children}</a>;
}

export function navigate(href, props = {}) {
    if (href.startsWith("/")) {
        href = ROUTE_PREFIX + href;
    }
    vikeNavigate(href, props);
}