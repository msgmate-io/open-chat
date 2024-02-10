export function tmpMessagesReducer(
  state = {
    initalized: false,
    errors: null,
  },
  action
) {
  switch (action.type) {
    case "initTmpMessages":
      const chats = action.payload;
      let tmpMessages = {};

      chats.forEach((chat) => {
        tmpMessages[chat.uuid] = [];
      });

      return { ...state, chats: tmpMessages, initalized: true };
    case "addTmpMessage":
      const { chatUuid, message } = action.payload;
      return {
        ...state,
        chats: {
          ...state.chats,
          [chatUuid]: [...state.chats[chatUuid], message],
        },
      };
    default:
      return state;
  }
}
