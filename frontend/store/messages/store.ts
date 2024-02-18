import {
  UpdateStatusAction,
  MessagesState,
  FetchMessagesAction,
  MessagesActionTypes,
  ServerSaveMessageAction,
  MarkChatsMessagesAsReadAction,
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
  | ServerSaveMessageAction
  | MarkChatsMessagesAsReadAction;

export function messagesReducer(
  state: MessagesState = initialState,
  action: Action
): MessagesState {
  switch (action.type) {
    case MessagesActionTypes.MARK_CHATS_MESSAGES_AS_READ:
      return {
        ...state,
        chat: {
          ...state.chat,
          [action.payload.chatId]: {
            ...state.chat[action.payload.chatId],
            results: (state.chat[action.payload.chatId]?.results || []).map(
              (message) => {
                return {
                  ...message,
                  read: true,
                };
              }
            ),
          },
        },
      };
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
