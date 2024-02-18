import { THEMES } from "./types";
import {
  LocalSettingsActionTypes,
  ChatListViews,
  SetChatListViewAction,
} from "./types";
import Cookies from "js-cookie";

export const changeTheme = (theme: THEMES) => async (dispatch: any) => {
  dispatch({ type: LocalSettingsActionTypes.CHANGE_THEME, payload: theme });
  Cookies.set("localSettings_Theme", theme);
  document.documentElement.setAttribute("data-theme", theme);
};

export function setChatListView(view: ChatListViews, dispatch: any) {
  dispatch({
    type: LocalSettingsActionTypes.SET_CHAT_LIST_VIEW,
    payload: view,
  });
}
