import { RootState } from "./reducer";
import { StatusTypes } from "./types";

export function mergeReduxState(state: RootState, newState: RootState) {
  const prevChatRes = state.chats.results ? state.chats.results : [];
  const curChatRes = newState.chats.results ? newState.chats.results : [];

  const mergeChatRes = curChatRes
    .filter((chat) => {
      return !prevChatRes.some((prevChat) => prevChat.uuid === chat.uuid);
    })
    .concat(prevChatRes);

  // If a check is selected we may try to merge the messages.chat[chatId].results
  let mergedMessageRes: any = null;
  let prevMessages: any = null;
  let prevPagination: any = null;
  const newSelectedChat = newState.chats.selectedChat;
  if (newSelectedChat) {
    prevPagination = state.messages.chat[newSelectedChat?.uuid];
    prevMessages = prevPagination?.results;
    if (prevMessages) {
      console.log("PREV MESSAGES", prevMessages);
      const newMessages =
        newState.messages.chat[newSelectedChat?.uuid]?.results || [];

      mergedMessageRes = newMessages.concat(
        prevMessages.filter((message) => {
          return !newMessages.some(
            (newMessage) => newMessage.uuid === message.uuid
          );
        })
      );

      // new messages always concatinated to the start as we per default alsways load page=1
    }
  }

  let mergedMessages = {
    ...state.messages,
    ...newState.messages,
    chat: {
      ...state.messages.chat,
      ...newState.messages.chat,
    },
    messages: {
      ...state.messages.messages,
      ...newState.messages.messages,
    },
  };

  if (mergedMessageRes) {
    console.log("STATE merged Pagination", prevPagination);
    const updatedChatMessages = {
      ...prevPagination, // if an old state exists it contains the current pagination
      results: mergedMessageRes,
    };

    mergedMessages.chat[newSelectedChat?.uuid] = updatedChatMessages;
    mergedMessages.messages = updatedChatMessages;
  }

  let mergedChat = {
    ...state.chats,
    ...newState.chats,
    results: mergeChatRes,
  };

  if (state.chats.status === StatusTypes.LOADED) {
    mergedChat = {
      ...newState.chats,
      ...state.chats,
      selectedChat: newState.chats.selectedChat,
      status: StatusTypes.LOADED,
      results: mergeChatRes,
    };
  }

  return {
    ...state,
    ...newState,
    chats: mergedChat,
    messages: mergedMessages,
  };
}
