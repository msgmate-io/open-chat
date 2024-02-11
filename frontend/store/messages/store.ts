import {
  UpdateStatusAction,
  MessagesState,
  MessagesActionTypes,
} from "./types";
import { StatusTypes } from "../types";

export const initialState: MessagesState = {
  status: StatusTypes.EMPTY,
  selectedChatId: null,
  errors: null,
  chat: {},
};

type Action = UpdateStatusAction;
export function messagesReducer(
  state: MessagesState = initialState,
  action: Action
): MessagesState {
  switch (action.type) {
    case MessagesActionTypes.UPDATE_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
}
