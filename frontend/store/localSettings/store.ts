interface LocalSettingsState {
  theme: "light" | "dark";
}

const initialState: LocalSettingsState = {
  theme: "light",
};

export function localSettingsReducer(
  state: LocalSettingsState = initialState,
  action
): LocalSettingsState {
  switch (action.type) {
    default:
      return state;
  }
}
