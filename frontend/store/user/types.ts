import { Api, UserSelf } from "../../api/api";
import { StatusTypes } from "../types";

export interface UserState extends UserSelf {
  status: StatusTypes;
  errors: string[] | string | null;
}

export enum UserActionTypes {
  UPDATE_USER = "UPDATE_USER",
}

export interface UpdateUserAction {
  type: UserActionTypes.UPDATE_USER;
  payload: UserSelf;
}
