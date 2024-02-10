export function chatReducer(
  state = {
    initalized: false,
    errors: null,
  },
  action
) {
  switch (action.type) {
    case "initChat":
      return { ...state, ...action.payload, initalized: true };
    default:
      return state;
  }
}
