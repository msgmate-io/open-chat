import { PaginatedMessageList, Api } from "../../api/api";
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

export enum MessagesActionTypes {
  UPDATE_STATUS = "UPDATE_STATUS",
}
