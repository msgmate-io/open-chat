export { data };
import { getApi, getApiServer } from "../api/client";

async function data(pageContext) {
  const api = getApiServer(pageContext);

  const chatsList = await api.chatsList({
    page: 1,
  });

  return {
    chatsList,
  };
}
