export default chatLoader;
import { RootState } from "../../../store/reducer";
import { getApiClient } from "../../../pages/api/client";
import { globalStore } from "../../../renderer/+onRenderClient";
import { fetchChats } from "../../../store/chats/api";
import { StatusTypes } from "../../../store/types";

function chatLoader({ params }) {
  const rootState: RootState = globalStore?.getState();
  const api = getApiClient(rootState.pageContext);

  if (rootState?.chats.status === StatusTypes.EMPTY)
    fetchChats(api, globalStore?.dispatch, { page: 1, page_size: 20 });
  return null;
}
