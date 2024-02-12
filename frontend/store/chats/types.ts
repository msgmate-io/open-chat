import { Api, PaginatedChatResultList } from "../../api/api";
import { StatusTypes } from "../types";
import { ChatResult } from "../../api/api";

export interface ChatsState extends PaginatedChatResultList {
  status: StatusTypes;
  selectedChat: ChatResult | null;
  errors: string[] | string | null;
}

export interface ChatsStatusAction {
  type: ChatsActionTypes.UPDATE_STATUS;
  payload: StatusTypes;
}

export interface ChatsFetchAction {
  type: ChatsActionTypes.FETCH_CHATS;
  payload: PaginatedChatResultList;
}

export interface ChatsSelectAction {
  type: ChatsActionTypes.SELECT_CHAT;
  payload: ChatResult;
}

export enum ChatsActionTypes {
  UPDATE_STATUS = "UPDATE_STATUS",
  SELECT_CHAT = "SELECT_CHAT",
  FETCH_CHATS = "FETCH_CHATS",
}
