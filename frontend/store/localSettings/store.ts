import { THEMES, ChangeThemeAction, LocalSettingsActionTypes } from "./types";
import {
  ChatListViews,
  LocalSettingsState,
  SetChatListViewAction,
} from "./types";

export const initialState: LocalSettingsState = {
  theme: THEMES.DARK,
  selectedChatListView: ChatListViews.LIST,
};

type Action = ChangeThemeAction | SetChatListViewAction;
export function localSettingsReducer(
  state: LocalSettingsState = initialState,
  action: Action
): LocalSettingsState {
  switch (action.type) {
    case LocalSettingsActionTypes.SET_CHAT_LIST_VIEW:
      return { ...state, selectedChatListView: action.payload };
    case LocalSettingsActionTypes.CHANGE_THEME:
      return { ...state, theme: action.payload };
    default:
      return state;
  }
}
