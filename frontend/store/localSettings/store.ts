import { THEMES, ChangeThemeAction, LocalSettingsActionTypes } from "./types";

export enum ChatListViews {
  LIST = "list",
  PROFILE = "profile",
}

export interface LocalSettingsState {
  theme: THEMES;
  selectedChatListView: ChatListViews;
}

const initialState: LocalSettingsState = {
  theme: THEMES.DARK,
  selectedChatListView: ChatListViews.LIST,
};

type Action = ChangeThemeAction;
export function localSettingsReducer(
  state: LocalSettingsState = initialState,
  action: Action
): LocalSettingsState {
  switch (action.type) {
    case LocalSettingsActionTypes.CHANGE_THEME:
      return { ...state, theme: action.payload };
    default:
      return state;
  }
}
