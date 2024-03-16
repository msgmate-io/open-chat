export const LOGIN_AS_GUEST = {
  allowed: true,
  username: "testUser1",
  password: "Test123!",
}
export const BASE_PAGE_TITLE = "Open Chat Interface"
export const FRONTNED_BACKEND_ROUTE = import.meta.env.PUBLIC_ENV__FRONTNED_BACKEND_ROUTE;
export const WEBSOCKET_PROTOCOLL =
  import.meta.env.PUBLIC_ENV__WEBSOCKET_PROTOCOLL || "ws://";
export const STATIC_EXPORT = import.meta.env.PUBLIC_ENV__STATIC_EXPORT;
