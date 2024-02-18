import {
  ChatResult,
  Message,
  PaginatedChatResultList,
  PaginatedMessageList,
} from "../../api/api";

export interface SelectedChatState {
  chat: ChatResult | null;
  messages: PaginatedMessageList | null;
}

export enum SelectedChatActionTypes {
  SELECT_MESSAGES = "SELECT_MESSAGES",
  SAVE_MESSAGE_SELECTED_CHAT = "SAVE_MESSAGE_SELECTED_CHAT",
  SELECT_CHAT = "SELECT_CHAT",
  FETCH_MESSAGES_SELECTED_CHAT = "FETCH_MESSAGES_SELECTED_CHAT",
  MARK_SELECTED_CHAT_MESSAGES_AS_READ = "MARK_SELECTED_CHAT_MESSAGES_AS_READ",
}

export interface SaveMessageSelectedChatAction {
  type: SelectedChatActionTypes.SAVE_MESSAGE_SELECTED_CHAT;
  payload: Message;
}

export interface SelectMessagesAction {
  type: SelectedChatActionTypes.SELECT_MESSAGES;
  payload: PaginatedMessageList | null;
}

export interface SelectChatAction {
  type: SelectedChatActionTypes.SELECT_CHAT;
  payload: ChatResult | null;
}

export interface FetchMessagesSelectedChatAction {
  type: SelectedChatActionTypes.FETCH_MESSAGES_SELECTED_CHAT;
  payload: PaginatedMessageList;
}

export interface MarkSelectedChatMessagesAsReadAction {
  type: SelectedChatActionTypes.MARK_SELECTED_CHAT_MESSAGES_AS_READ;
}
