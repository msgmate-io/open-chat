import {
  UpdateStatusAction,
  MessagesState,
  FetchMessagesAction,
  MessagesActionTypes,
  ServerSaveMessageAction,
} from "./types";
import { StatusTypes } from "../types";

export const initialState: MessagesState = {
  status: StatusTypes.EMPTY,
  errors: null,
  chat: {},
};

type Action =
  | UpdateStatusAction
  | FetchMessagesAction
  | ServerSaveMessageAction;

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
      };
    case MessagesActionTypes.SERVER_SAVE_MESSAGE:
      return {
        ...state,
        chat: {
          ...state.chat,
          [action.payload.chatId]: {
            ...state.chat[action.payload.chatId],
            results: [
              action.payload.message,
              ...(state.chat[action.payload.chatId]?.results || []),
            ],
          },
        },
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
