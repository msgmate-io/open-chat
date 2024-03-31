export const LOGIN_AS_GUEST = {
  allowed: (import.meta.env.PUBLIC_ENV__GUEST_LOGIN_ALLOWED || "false") === "true",
  username: import.meta.env.PUBLIC_ENV__GUEST_USERNAME,
  password: import.meta.env.PUBLIC_ENV__GUEST_PASSWORD,
}

export enum BT {
  CAPACITOR = "capacitor",
  DOCS = "docs",
  WEB = "web",
}
export const BUILD_TYPE: BT = import.meta.env.PUBLIC_ENV__LOGIN_ROUTE || "/login";
export const STATIC_EXPORT = BUILD_TYPE !== BT.WEB;
export const LOGIN_ROUTE = import.meta.env.PUBLIC_ENV__LOGIN_ROUTE || "/login";

// 'ROUTE_PREFIX' is added on 'navigate' and 'Link' from `@/components/atoms/Link`
export const ROUTE_PREFIX = import.meta.env.PUBLIC_ENV__ROUTE_PREFIX || "";

// 'FRONTNED_BACKEND_ROUTE' is used for client side requests
export const FRONTNED_BACKEND_ROUTE = import.meta.env.PUBLIC_ENV__FRONTNED_BACKEND_ROUTE;

// 'WEBSOCKET_URL' constructed client websocket url
export const WEBSOCKET_PROTOCOLL = import.meta.env.PUBLIC_ENV__WEBSOCKET_PROTOCOLL;
export const WEBSOCKET_HOST = import.meta.env.PUBLIC_ENV__WEBSOCKET_HOST;
export const WEBSOCKET_PATH = import.meta.env.PUBLIC_ENV__WEBSOCKET_PATH;
export const WEBSOCKET_URL = `${WEBSOCKET_PROTOCOLL}${WEBSOCKET_HOST}${WEBSOCKET_PATH}`;

export const BASE_PAGE_TITLE = "Open Chat Interface"
