import { Api } from "./api";

interface GetApiParamTypes {
  cookie: string;
  xcsrfToken: string;
}

export function getApi(props: GetApiParamTypes): typeof Api.prototype.api {
  const isServer = typeof window === "undefined";
  const api = new Api({
    baseUrl: isServer ? "http://backend:8000" : "",
    baseApiParams: {
      headers: {
        cookie: props.cookie,
        "X-CSRFToken": props.xcsrfToken,
      },
    },
  });
  return api.api;
}
