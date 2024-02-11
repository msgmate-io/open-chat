import { Api, PaginatedChatResultList } from "../../api/api";
import { StatusTypes } from "../types";

export interface ChatsState extends PaginatedChatResultList {
  status: StatusTypes;
  errors: string[] | string | null;
}

export interface ChatsStatusAction {
  type: ChatsActionTypes.UPDATE_STATUS;
  payload: StatusTypes;
}

export enum ChatsActionTypes {
  UPDATE_STATUS = "UPDATE_STATUS",
}
