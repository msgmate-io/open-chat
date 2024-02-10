export function messagesReducer(
  state = {
    initalized: false,
    errors: null,
  },
  action
) {
  switch (action.type) {
    case "initMessages":
      return { ...state, ...action.payload, initalized: true };
    case "initChatMessages":
      return {
        ...state,
        [action.payload.chat]: action.payload.data,
        errors: null,
      };
    default:
      return state;
  }
}
