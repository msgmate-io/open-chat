import { Api, UserSelf } from "../../api/api";
import { StatusTypes } from "../types";
import {
  UserState,
  UpdateUserAction,
  UserActionTypes,
  UpdateStatusUserAction,
} from "./types";

const initialState: UserState = {
  status: StatusTypes.EMPTY,
  errors: null,
  uuid: "",
  email: "",
  id: 0,
};

type Action = UpdateUserAction | UpdateStatusUserAction;

export function userReducer(
  state: UserState = initialState,
  action: Action
): UserState {
  switch (action.type) {
    case UserActionTypes.UPDATE_USER:
      return {
        ...state,
        ...action.payload,
      };
    case UserActionTypes.UPDATE_STATUS_USER:
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
}
