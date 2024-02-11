import { PaginatedMessageList, Api } from "../../api/api";
import { StatusTypes } from "../types";

export interface MessagesState extends PaginatedMessageList {
  status: StatusTypes;
  errors: string[] | string | null;
}

export enum MessagesActionTypes {
  UPDATE_STATUS = "UPDATE_STATUS",
}
