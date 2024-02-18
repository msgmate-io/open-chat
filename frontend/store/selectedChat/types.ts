import { ChatResult, PaginatedMessageList } from "../../api/api";

export interface SelectedChatState {
  chat: ChatResult | null;
  messages: PaginatedMessageList | null;
}

export enum SelectedChatActionTypes {
  SELECT_MESSAGES = "SELECT_MESSAGES",
  SELECT_CHAT = "SELECT_CHAT",
}

export interface SelectMessagesAction {
  type: SelectedChatActionTypes.SELECT_MESSAGES;
  payload: PaginatedMessageList | null;
}

export interface SelectChatAction {
  type: SelectedChatActionTypes.SELECT_CHAT;
  payload: ChatResult | null;
}
