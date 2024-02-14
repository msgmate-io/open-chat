import { Api, UserSelf } from "../../api/api";
import { StatusTypes } from "../types";
import { UserState, UpdateUserAction, UserActionTypes } from "./types";

const initialState: UserState = {
  status: StatusTypes.EMPTY,
  errors: null,
  uuid: "",
  email: "",
  id: 0,
};

type Action = UpdateUserAction;

export function userReducer(
  state: UserState = initialState,
  action: Action
): UserState {
  switch (action.type) {
    case UserActionTypes.UPDATE_USER:
      return {
        ...state,
        ...action.payload,
        status: StatusTypes.LOADED,
      };
    default:
      return state;
  }
}
