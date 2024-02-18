import {
  SelectedChatState,
  SelectedChatActionTypes,
  SelectChatAction,
  SelectMessagesAction,
} from "./types";
import { ChatResult, PaginatedMessageList } from "../../api/api";

export const initialState: SelectedChatState = {
  chat: null,
  messages: null,
};

type Action = SelectMessagesAction | SelectChatAction;

export function selectedChatReducer(
  state: SelectedChatState = initialState,
  action: Action
): SelectedChatState {
  switch (action.type) {
    case SelectedChatActionTypes.SELECT_CHAT:
      return {
        ...state,
        chat: action.payload,
      };
    case SelectedChatActionTypes.SELECT_MESSAGES:
      return {
        ...state,
        messages: action.payload,
      };
    default:
      return state;
  }
}
