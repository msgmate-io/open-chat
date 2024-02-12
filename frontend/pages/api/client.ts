import { Api } from "./api";
import { useSelector } from "react-redux";

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

export function getApiServer(pageContext: any) {
  return getApi({
    cookie: pageContext.requestHeaders.cookie,
    xcsrfToken: pageContext.xcsrfToken,
  });
}

export function useApi() {
  const pageContext = useSelector((state: any) => state.pageContext);

  return getApi({
    cookie: pageContext.cookie,
    xcsrfToken: pageContext.xcsrfToken,
  });
}
