import { getApi, getApiServer } from "../../api/client";
import { ChatsState } from "../../../store/chats/types";
import { StatusTypes } from "../../../store/types";
import { MessagesState } from "../../../store/messages/types";
import { initialState } from "../../../store/messages/store";
import { UserState } from "../../../store/user/types";

export default onBeforeRender;

async function onBeforeRender(pageContext) {
  const api = getApiServer(pageContext);
  const chatsList = await api.chatsList({
    page: 1,
  });

  const initChatState: ChatsState = {
    ...chatsList,
    status: StatusTypes.LOADED,
    errors: null,
  };

  const user = await api.userRetrieve();

  const initialUserState: UserState = {
    ...user,
    status: StatusTypes.LOADED,
    errors: null,
  };

  const chatId = pageContext.routeParams.chatId;
  const chat = chatId ? await api.messagesList2({ chatUuid: chatId }) : null;

  // Todo: correctly handle errors

  const initMessagesState: MessagesState = {
    status: StatusTypes.LOADED,
    selectedChatId: chatId,
    errors: null,
    chat:
      chatId && chat
        ? {
            [chatId]: chat,
          }
        : {},
  };

  return {
    pageContext: {
      INJECT_REDUX_STATE: {
        chats: initChatState,
        user: initialUserState,
        messages: initMessagesState,
      },
    },
  };
}
