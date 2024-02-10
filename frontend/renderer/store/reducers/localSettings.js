export function localSettingsReducer(
  state = {
    theme: "light",
  },
  action
) {
  switch (action.type) {
    case "changeTheme":
      console.log("changeTheme", action.payload);
      return { ...state, theme: action.payload };
    default:
      return state;
  }
}
