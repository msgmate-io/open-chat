import { PaginatedMessageList, Api, ChatResult } from "../../api/api";
import { StatusTypes } from "../types";

export interface MessagesState {
  status: StatusTypes;
  errors: string[] | string | null;
  messages: PaginatedMessageList | null;
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

export enum MessagesActionTypes {
  UPDATE_STATUS = "UPDATE_STATUS",
  FETCH_MESSAGES = "FETCH_MESSAGES",
}
