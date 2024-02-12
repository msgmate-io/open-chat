import { ChatsActionTypes } from "./types";
import { StatusTypes } from "../types";
import { navigate } from "vike/client/router";
import { getApi } from "../../api/client";
import { Api, ChatsListParams } from "../../api/api";
import { ChatResult } from "../../api/api";

export async function updateStatus(status: StatusTypes, dispatch: any) {
  dispatch({
    type: ChatsActionTypes.UPDATE_STATUS,
    payload: status,
  });
}

export async function selectChat(chat: ChatResult, dispatch: any) {
  await updateStatus(StatusTypes.LOADING, dispatch);
  await dispatch({
    type: ChatsActionTypes.SELECT_CHAT,
    payload: chat,
  });
  navigate(`/chat/${chat.uuid}`);
  await updateStatus(StatusTypes.LOADED, dispatch);
}

export async function fetchChats(
  api: typeof Api.prototype.api,
  dispatch: any,
  query: ChatsListParams
) {
  await updateStatus(StatusTypes.LOADING, dispatch);
  const res = await api.chatsList(query);
  await dispatch({
    type: ChatsActionTypes.FETCH_CHATS,
    payload: res,
  });
  await updateStatus(StatusTypes.LOADED, dispatch);
}
