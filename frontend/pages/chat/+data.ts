export { data };

import { Api, PatchedChat } from "../../api/api";

async function data(pageContext) {
  const api = new Api({
    baseUrl: "http://backend:8000",
    baseApiParams: {
      headers: {
        cookie: pageContext.requestHeaders.cookie,
        "X-CSRFToken": pageContext.xcsrfToken,
      },
    },
  });

  const chatsList = await api.api.chatsList({
    page: 1,
  });

  return {
    chatsList,
  };
}
