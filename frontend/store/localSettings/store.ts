import { THEMES, ChangeThemeAction, LocalSettingsActionTypes } from "./types";

interface LocalSettingsState {
  theme: THEMES;
}

const initialState: LocalSettingsState = {
  theme: THEMES.DARK,
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
