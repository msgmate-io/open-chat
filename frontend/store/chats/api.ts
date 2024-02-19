import { ChatsActionTypes, ChatsState } from "./types";
import { StatusTypes } from "../types";
import { Api, ChatsListParams } from "../../api/api";
import { ChatResult } from "../../api/api";
import { MessagesActionTypes, MessagesState } from "../messages/types";
import { fetchMessages } from "../messages/api";
import { SelectedChatActionTypes } from "../selectedChat/types";

export async function updateStatus(status: StatusTypes, dispatch: any) {
  dispatch({
    type: ChatsActionTypes.UPDATE_STATUS_CHATS,
    payload: status,
  });
}

export async function unselectChat(dispatch: any, navigate: any) {
  await dispatch({
    type: SelectedChatActionTypes.SELECT_CHAT,
    payload: null,
  });
  await dispatch({
    type: SelectedChatActionTypes.SELECT_MESSAGES,
    payload: null,
  });
  navigate("/chat");
}

export async function fetchOrLoadMessages(
  api: typeof Api.prototype.api,
  chats: ChatsState,
  chatId: string,
  dispatch: any,
  messages: MessagesState
) {
  let chat = chats.results?.find((c) => c.uuid === chatId);
  if (!chat) {
    chat = await api.chatsRetrieve(chatId);
    await dispatch({
      type: ChatsActionTypes.ADD_CHAT,
      payload: chat,
    });
  }
  if (!messages.chat[chat.uuid]) {
    await fetchMessages(
      api,
      dispatch,
      chat,
      {
        page: 1,
        page_size: 20,
        chatUuid: chat?.uuid,
      },
      messages
    );
  } else {
    await dispatch({
      type: SelectedChatActionTypes.SELECT_MESSAGES,
      payload: messages.chat[chat.uuid],
    });
  }
  await dispatch({
    type: SelectedChatActionTypes.SELECT_CHAT,
    payload: chat,
  });
  await dispatch({
    type: MessagesActionTypes.UPDATE_STATUS,
    payload: StatusTypes.LOADED,
  });
}

export async function selectChat(
  api: typeof Api.prototype.api,
  chat: ChatResult,
  curSelectedChat: ChatResult | null,
  dispatch: any,
  navigate: any,
  messages: MessagesState
) {
  await updateStatus(StatusTypes.LOADING, dispatch);
  await dispatch({
    // TODO: can we get rid of this?
    type: MessagesActionTypes.UPDATE_STATUS,
    payload: StatusTypes.LOADING,
  });
  if (!messages.chat[chat.uuid]) {
    await fetchMessages(
      api,
      dispatch,
      chat,
      {
        page: 1,
        page_size: 20,
        chatUuid: chat?.uuid,
      },
      messages
    );
  } else {
    await dispatch({
      type: SelectedChatActionTypes.SELECT_MESSAGES,
      payload: messages.chat[chat.uuid],
    });
  }
  await dispatch({
    type: SelectedChatActionTypes.SELECT_CHAT,
    payload: chat,
  });
  navigate(`/chat/${chat.uuid}`);
  await dispatch({
    type: MessagesActionTypes.UPDATE_STATUS,
    payload: StatusTypes.LOADED,
  });
  await updateStatus(StatusTypes.LOADED, dispatch);
}

export async function fetchChats(
  api: typeof Api.prototype.api,
  dispatch: any,
  query: ChatsListParams
) {
  await updateStatus(StatusTypes.LOADING_MORE, dispatch);
  const res = await api.chatsList(query);
  await dispatch({
    type: ChatsActionTypes.FETCH_CHATS,
    payload: res,
  });
  await updateStatus(StatusTypes.LOADED, dispatch);
}
