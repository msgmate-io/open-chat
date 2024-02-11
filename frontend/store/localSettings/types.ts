export enum THEMES {
  LIGHT = "light",
  DARK = "dark",
  CUPCAKE = "cupcake",
  RETRO = "retro",
}

export enum LocalSettingsActionTypes {
  CHANGE_THEME = "CHANGE_THEME",
}

export interface ChangeThemeAction {
  type: LocalSettingsActionTypes.CHANGE_THEME;
  payload: THEMES;
}
