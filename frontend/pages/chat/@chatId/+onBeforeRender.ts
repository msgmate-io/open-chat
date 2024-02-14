import { getApi, getApiServer } from "../../api/client";
import { ChatsState } from "../../../store/chats/types";
import { StatusTypes } from "../../../store/types";
import { MessagesState } from "../../../store/messages/types";
import { initialState } from "../../../store/messages/store";
import { UserState } from "../../../store/user/types";

export default onBeforeRender;

async function onBeforeRender(pageContext) {
  console.log("pageContext", pageContext);
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

  const chatId = pageContext.routeParams.chatId;
  const chatMessages = chatId
    ? await api.messagesList2({ chatUuid: chatId, page_size: 20 })
    : null;

  // Todo: correctly handle errors

  const initMessagesState: MessagesState = {
    status: StatusTypes.LOADED,
    messages: chatMessages,
    errors: null,
    chat:
      chatId && chatMessages
        ? {
            [chatId]: chatMessages,
          }
        : {},
  };

  // if currently selected chat is not in the list we need to also fetch it
  const selectedChatFetched = chatsList.results?.find(
    (chat) => chat.uuid === chatId
  );

  let selectedChat = selectedChatFetched ? selectedChatFetched[0] : null;

  if (!selectedChat && chatId) {
    try {
      selectedChat = await api.chatsRetrieve(chatId);
    } catch (e) {
      console.error("Error fetching selected chat", e);
    }
  }

  const initChatState: ChatsState = {
    ...chatsList,
    selectedChat,
    status: StatusTypes.LOADED,
    errors: null,
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
