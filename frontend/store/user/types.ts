import { Api, UserSelf } from "../../api/api";
import { StatusTypes } from "../types";

export interface UserState extends UserSelf {
  status: StatusTypes;
  errors: {
    [fieldName: string]: string[];
  };
}

export enum UserActionTypes {
  UPDATE_USER = "UPDATE_USER",
  UPDATE_STATUS_USER = "UPDATE_STATUS_USER",
}

export interface UpdateUserAction {
  type: UserActionTypes.UPDATE_USER;
  payload: UserSelf;
}

export interface UpdateStatusUserAction {
  type: UserActionTypes.UPDATE_STATUS_USER;
  payload: StatusTypes;
}
