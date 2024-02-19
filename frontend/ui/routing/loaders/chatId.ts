export default chatIdLoader;
import { RootState } from "../../../store/reducer";
import { fetchOrLoadMessages } from "../../../store/chats/api";
import { getApiClient } from "../../../pages/api/client";
import { globalStore } from "../../../renderer/+onRenderClient";

function chatIdLoader({ params }) {
  const rootState: RootState = globalStore?.getState();
  const api = getApiClient(rootState.pageContext);
  fetchOrLoadMessages(
    api,
    rootState.chats,
    params.chatId,
    globalStore?.dispatch,
    rootState.messages
  );
  return null;
}
