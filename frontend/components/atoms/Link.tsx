import { ROUTE_PREFIX } from "@/renderer/constants";
import { navigate } from "vike/client/router";

export function Link({ ...props }) {
    let href = props.href;
    if (props.href?.startsWith("/")) {
        href = ROUTE_PREFIX + props.href;
    }
    const children = props.children;
    delete props.href;
    delete props.children;
    return <a href={href} {...props}>{children}</a>;
}

export function navigateTo(href, props) {
    if (href.startsWith("/")) {
        href = ROUTE_PREFIX + href;
    }
    navigate(href, props);
}