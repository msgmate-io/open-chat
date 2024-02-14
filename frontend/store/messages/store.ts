import {
  UpdateStatusAction,
  MessagesState,
  FetchMessagesAction,
  MessagesActionTypes,
  SelectMessagesAction,
} from "./types";
import { StatusTypes } from "../types";

export const initialState: MessagesState = {
  status: StatusTypes.EMPTY,
  messages: null,
  errors: null,
  chat: {},
};

type Action = UpdateStatusAction | FetchMessagesAction | SelectMessagesAction;
export function messagesReducer(
  state: MessagesState = initialState,
  action: Action
): MessagesState {
  switch (action.type) {
    case MessagesActionTypes.FETCH_MESSAGES:
      const oldMessages = state.chat[action.payload.chat.uuid]?.results || [];
      const newMessages = action.payload.messages.results || [];

      const mergedMessagesRes = oldMessages
        ?.filter((message) => {
          return !newMessages.some(
            (newMessage) => newMessage.uuid === message.uuid
          );
        })
        .concat(newMessages);
      const mergedMessages = {
        ...action.payload.messages,
        results: mergedMessagesRes,
      };

      return {
        ...state,
        chat: {
          ...state.chat,
          [action.payload.chat.uuid]: mergedMessages,
        },
        messages: mergedMessages,
      };
    case MessagesActionTypes.SELECT_MESSAGES:
      return {
        ...state,
        messages: action.payload,
      };
    case MessagesActionTypes.UPDATE_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
}
