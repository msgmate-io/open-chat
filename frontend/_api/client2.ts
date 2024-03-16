import { Api } from "./api";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

interface GetApiParamTypes {
  cookie: string;
  xcsrfToken: string;
}

export function getApi(props: GetApiParamTypes): typeof Api.prototype.api {
  const isServer = typeof window === "undefined";
  let headers: any = {
    "X-CSRFToken": props.xcsrfToken,
  }
  if (props.cookie) {
    headers = {
      ...headers,
      cookie: props.cookie,
    }
  }
  const api = new Api({
    baseUrl: isServer ? "http://backend:8000" : "",
    baseApiParams: {
      headers
    },
  });
  return api.api;
}

export function getApiClient(pageContext: any) {
  return getApi({
    cookie: pageContext.cookie,
    xcsrfToken: pageContext.xcsrfToken,
  });
}

export function getApiServer(pageContext: any) {
  return getApi({
    cookie: pageContext.requestHeaders.cookie,
    xcsrfToken: pageContext.xcsrfToken,
  });
}

export function useApi() {
  const frontend = useSelector((state: any) => state.frontend);
  const isServer = typeof window === "undefined";

  return isServer ? getApi({
    cookie: frontend.cookie,
    xcsrfToken: frontend.xcsrfToken,
  }) : getApi({
    xcsrfToken: Cookies.get("csrftoken") || "",
    cookie: null
  })
}
