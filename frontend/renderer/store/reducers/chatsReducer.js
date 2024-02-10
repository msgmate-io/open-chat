export function chatsReducer(
  state = {
    selectedChatId: null,
  },
  action
) {
  switch (action.type) {
    case "initChats":
      return { ...state, ...action.payload };
    case "selectChat":
      return { ...state, selectedChatId: action.payload };
    default:
      return state;
  }
}
