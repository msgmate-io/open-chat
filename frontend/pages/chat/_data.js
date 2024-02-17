import { getApiServer } from "../api/client";

export async function data(pageContext) {
  const api = getApiServer(pageContext);
  const chats = await api.chatsList({ page: 1 });

  console.log("chats", chats);
  return { chats };
}
