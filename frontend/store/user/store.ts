import { Api, UserSelf } from "../../api/api";
import { StatusTypes } from "../types";
import { UserState } from "./types";

const initialState: UserState = {
  status: StatusTypes.EMPTY,
  errors: null,
  uuid: "",
  username: "",
  email: "",
  id: 0,
};

export function userReducer(
  state: UserState = initialState,
  action
): UserState {
  switch (action.type) {
    default:
      return state;
  }
}
