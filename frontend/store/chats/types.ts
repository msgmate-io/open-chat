import { Api, PaginatedChatResultList } from "../../api/api";
import { StatusTypes } from "../types";
import { ChatResult } from "../../api/api";

export interface ChatsState extends PaginatedChatResultList {
  status: StatusTypes;
  selectedChat: ChatResult | null;
  errors: string[] | string | null;
}

export interface ChatsStatusAction {
  type: ChatsActionTypes.UPDATE_STATUS_CHATS;
  payload: StatusTypes;
}

export interface ChatsFetchAction {
  type: ChatsActionTypes.FETCH_CHATS;
  payload: PaginatedChatResultList;
}

export interface ChatsUpdateUnreadCountAction {
  type: ChatsActionTypes.UPDATE_UNREAD_COUNT;
  payload: { chatId: string; unreadCount: number };
}

export interface ChatsAddChatAction {
  type: ChatsActionTypes.ADD_CHAT;
  payload: ChatResult;
}

export enum ChatsActionTypes {
  UPDATE_STATUS_CHATS = "UPDATE_STATUS_CHATS",
  FETCH_CHATS = "FETCH_CHATS",
  UPDATE_UNREAD_COUNT = "UPDATE_UNREAD_COUNT",
  ADD_CHAT = "ADD_CHAT",
}
