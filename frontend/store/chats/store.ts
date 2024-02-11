import { ChatsActionTypes, ChatsState, ChatsStatusAction } from "./types";
import { StatusTypes } from "../types";

export const initialState: ChatsState = {
  status: StatusTypes.EMPTY,
  errors: null,
  results: [],
};

type Action = ChatsStatusAction;

export function chatsReducer(
  state: ChatsState = initialState,
  action: Action
): ChatsState {
  switch (action.type) {
    case ChatsActionTypes.UPDATE_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
}
