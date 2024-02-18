export enum THEMES {
  LIGHT = "light",
  DARK = "dark",
  CUPCAKE = "cupcake",
  RETRO = "retro",
}

export interface LocalSettingsState {
  theme: THEMES;
  selectedChatListView: ChatListViews;
}

export enum ChatListViews {
  LIST = "list",
  PROFILE = "profile",
}

export enum LocalSettingsActionTypes {
  CHANGE_THEME = "CHANGE_THEME",
  SET_CHAT_LIST_VIEW = "SET_CHAT_LIST_VIEW",
}

export interface ChangeThemeAction {
  type: LocalSettingsActionTypes.CHANGE_THEME;
  payload: THEMES;
}

export interface SetChatListViewAction {
  type: LocalSettingsActionTypes.SET_CHAT_LIST_VIEW;
  payload: ChatListViews;
}
