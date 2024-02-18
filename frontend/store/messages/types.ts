import { PaginatedMessageList, Api, ChatResult, Message } from "../../api/api";
import { StatusTypes } from "../types";

export interface MessagesState {
  status: StatusTypes;
  errors: string[] | string | null;
  chat: {
    [chatId: string]: PaginatedMessageList;
  };
}

export interface UpdateStatusAction {
  type: MessagesActionTypes.UPDATE_STATUS;
  payload: StatusTypes;
}

export interface FetchMessagesAction {
  type: MessagesActionTypes.FETCH_MESSAGES;
  payload: {
    chat: ChatResult;
    messages: PaginatedMessageList;
  };
}

export interface ServerSaveMessageAction {
  type: MessagesActionTypes.SERVER_SAVE_MESSAGE;
  payload: {
    chatId: string;
    message: Message;
  };
}

export interface MarkChatsMessagesAsReadAction {
  type: MessagesActionTypes.MARK_CHATS_MESSAGES_AS_READ;
  payload: {
    chatId: string;
  };
}

export enum MessagesActionTypes {
  UPDATE_STATUS = "UPDATE_STATUS",
  FETCH_MESSAGES = "FETCH_MESSAGES",
  SERVER_SAVE_MESSAGE = "SERVER_SAVE_MESSAGE",
  MARK_CHATS_MESSAGES_AS_READ = "MARK_CHATS_MESSAGES_AS_READ",
}
