import {
  ChatsActionTypes,
  ChatsState,
  ChatsStatusAction,
  ChatsFetchAction,
  ChatsSelectAction,
} from "./types";
import { StatusTypes } from "../types";

export const initialState: ChatsState = {
  status: StatusTypes.EMPTY,
  selectedChat: null,
  errors: null,
  results: [],
};

type Action = ChatsStatusAction | ChatsFetchAction | ChatsSelectAction;

export function chatsReducer(
  state: ChatsState = initialState,
  action: Action
): ChatsState {
  switch (action.type) {
    case ChatsActionTypes.UPDATE_STATUS_CHATS:
      return {
        ...state,
        status: action.payload,
      };
    case ChatsActionTypes.SELECT_CHAT:
      return {
        ...state,
        selectedChat: action.payload,
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
