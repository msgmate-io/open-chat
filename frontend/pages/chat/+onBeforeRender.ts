import { getApi, getApiServer } from "../api/client";
import { ChatsState } from "../../store/chats/types";
import { StatusTypes } from "../../store/types";
import { UserState } from "../../store/user/types";
import { initialState } from "../../store/messages/store";

export default onBeforeRender;

async function onBeforeRender(pageContext) {
  const api = getApiServer(pageContext);

  const chatsList = await api.chatsList({
    page: 1,
  });

  const user = await api.userRetrieve();

  const initialUserState: UserState = {
    ...user,
    status: StatusTypes.LOADED,
    errors: null,
  };

  const initChatState: ChatsState = {
    ...chatsList,
    selectedChat: null,
    status: StatusTypes.LOADED,
    errors: null,
  };

  return {
    pageContext: {
      INJECT_REDUX_STATE: {
        chats: initChatState,
        user: initialUserState,
      },
    },
  };
}
