export const LOGIN_AS_GUEST = {
  allowed: true,
  username: "testUser1",
  password: "Test123!",
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
export const WEBSOCKET_URL = `${import.meta.env.PUBLIC_ENV__WEBSOCKET_PROTOCOLL || "ws"}${import.meta.env.PUBLIC_ENV__WEBSOCKET_HOST || "localhost"}${import.meta.env.PUBLIC_ENV__WEBSOCKET_PATH}`;

export const BASE_PAGE_TITLE = "Open Chat Interface"
