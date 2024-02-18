import {
  SelectedChatState,
  SelectedChatActionTypes,
  SelectChatAction,
  SelectMessagesAction,
  SaveMessageSelectedChatAction,
  FetchMessagesSelectedChatAction,
} from "./types";
import { ChatResult, PaginatedMessageList } from "../../api/api";
import { mergeMessageResults } from "../messages/api";

export const initialState: SelectedChatState = {
  chat: null,
  messages: null,
};

type Action =
  | SelectMessagesAction
  | SelectChatAction
  | SaveMessageSelectedChatAction
  | FetchMessagesSelectedChatAction;

export function selectedChatReducer(
  state: SelectedChatState = initialState,
  action: Action
): SelectedChatState {
  switch (action.type) {
    case SelectedChatActionTypes.FETCH_MESSAGES_SELECTED_CHAT:
      return {
        ...state,
        messages: state.messages
          ? mergeMessageResults(state.messages, action.payload)
          : action.payload,
      };
    case SelectedChatActionTypes.SAVE_MESSAGE_SELECTED_CHAT:
      return {
        ...state,
        messages: {
          ...state.messages,
          results: [action.payload, ...(state.messages?.results || [])],
        },
      };
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
