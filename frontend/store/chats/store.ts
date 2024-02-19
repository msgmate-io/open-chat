import {
  ChatsActionTypes,
  ChatsState,
  ChatsStatusAction,
  ChatsFetchAction,
  ChatsUpdateUnreadCountAction,
  ChatsAddChatAction,
} from "./types";
import { StatusTypes } from "../types";

export const initialState: ChatsState = {
  status: StatusTypes.EMPTY,
  selectedChat: null,
  errors: null,
  results: [],
};

type Action =
  | ChatsStatusAction
  | ChatsFetchAction
  | ChatsUpdateUnreadCountAction
  | ChatsAddChatAction;

export function chatsReducer(
  state: ChatsState = initialState,
  action: Action
): ChatsState {
  switch (action.type) {
    case ChatsActionTypes.ADD_CHAT:
      return {
        ...state,
        results: [
          action.payload,
          ...(state.results || []).filter(
            (chat) => chat.uuid !== action.payload.uuid
          ),
        ],
      };
    case ChatsActionTypes.UPDATE_UNREAD_COUNT:
      return {
        ...state,
        results: (state.results || []).map((chat) => {
          if (chat.uuid === action.payload.chatId) {
            return {
              ...chat,
              unread_count: action.payload.unreadCount,
            };
          }
          return chat;
        }),
      };
    case ChatsActionTypes.UPDATE_STATUS_CHATS:
      return {
        ...state,
        status: action.payload,
      };
    case ChatsActionTypes.FETCH_CHATS:
      const prevResults = state.results ? state.results : [];
      let newResults = action.payload.results ? action.payload.results : [];
      newResults = newResults.filter((chat) => {
        const chatId = chat.uuid;
        const isChatExists = prevResults.some((prevChat) => {
          return prevChat.uuid === chatId;
        });
        return !isChatExists;
      });
      return {
        ...state,
        ...action.payload,
        results: [...prevResults, ...newResults],
      };
    default:
      return state;
  }
}
