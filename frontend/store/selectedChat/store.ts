import {
  SelectedChatState,
  SelectedChatActionTypes,
  SelectChatAction,
  SelectMessagesAction,
  SaveMessageSelectedChatAction,
  FetchMessagesSelectedChatAction,
  MarkSelectedChatMessagesAsReadAction,
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
  | FetchMessagesSelectedChatAction
  | MarkSelectedChatMessagesAsReadAction;

export function selectedChatReducer(
  state: SelectedChatState = initialState,
  action: Action
): SelectedChatState {
  switch (action.type) {
    case SelectedChatActionTypes.MARK_SELECTED_CHAT_MESSAGES_AS_READ:
      return {
        ...state,
        messages: {
          ...state.messages,
          results: (state.messages?.results || []).map((message) => {
            return {
              ...message,
              read: true,
            };
          }),
        },
      };
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
