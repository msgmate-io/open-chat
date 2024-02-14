import { ChatsActionTypes } from "./types";
import { StatusTypes } from "../types";
import { navigate } from "vike/client/router";
import { getApi } from "../../api/client";
import { Api, ChatsListParams } from "../../api/api";
import { ChatResult } from "../../api/api";
import { MessagesActionTypes } from "../messages/types";

export async function updateStatus(status: StatusTypes, dispatch: any) {
  dispatch({
    type: ChatsActionTypes.UPDATE_STATUS_CHATS,
    payload: status,
  });
}

export async function selectChat(
  chat: ChatResult,
  curSelectedChat: ChatResult | null,
  dispatch: any
) {
  await updateStatus(StatusTypes.LOADING, dispatch);
  await dispatch({
    type: MessagesActionTypes.UPDATE_STATUS,
    payload: StatusTypes.LOADING,
  });
  if (curSelectedChat?.uuid === chat.uuid) {
    await dispatch({
      type: ChatsActionTypes.SELECT_CHAT,
      payload: null,
    });
    navigate(`/chat`);
  } else {
    await dispatch({
      type: ChatsActionTypes.SELECT_CHAT,
      payload: chat,
    });
    navigate(`/chat/${chat.uuid}`);
  }
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
