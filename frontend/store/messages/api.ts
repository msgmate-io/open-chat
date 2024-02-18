import { MessagesActionTypes } from "./types";
import { StatusTypes } from "../types";
import { Api, SendMessage, Message, MessagesList2Params } from "../../api/api";
import { ChatResult, PaginatedMessageList } from "../../api/api";
import { MessagesState } from "./types";
import { TmpMessagesActionTypes } from "../tmpMessages/types";
import { UserState } from "../user/types";
import { SelectedChatActionTypes } from "../selectedChat/types";
import { MarkChatsMessagesAsReadAction } from "./types";

export const updateStatus = (status: StatusTypes) => async (dispatch: any) => {
  dispatch({
    type: MessagesActionTypes.UPDATE_STATUS,
    payload: status,
  });
};

export function mergeMessageResults(
  messagesOld: PaginatedMessageList,
  messagesNew: PaginatedMessageList
) {
  return {
    ...messagesNew,
    results: messagesOld.results
      ?.filter((message) => {
        return !messagesNew.results?.some(
          (newMessage) => newMessage.uuid === message.uuid
        );
      })
      .concat(messagesNew.results || []),
  };
}

export async function sendMessage(
  api: typeof Api.prototype.api,
  dispatch: any,
  user: UserState,
  chat: ChatResult,
  message: SendMessage
) {
  // sends a message, first in tmpMessages and if send is successful, then in messages
  const tmpMessage: Message = {
    uuid: "tmp-" + Math.random(),
    created: new Date().toISOString(),
    sender: user.uuid,
    text: message.text,
  };
  await dispatch({
    type: TmpMessagesActionTypes.ADD_OUTGOING_MESSAGE,
    payload: {
      chatId: chat.uuid,
      message: tmpMessage,
    },
  });

  const serverMessage = await api.messagesSendCreate(chat.uuid, message);
  //TODO: do attomic dispatch
  await dispatch({
    type: TmpMessagesActionTypes.REMOVE_OUTGOING_MESSAGE,
    payload: {
      chatId: chat.uuid,
      messageId: tmpMessage.uuid,
    },
  });
  await dispatch({
    type: MessagesActionTypes.SERVER_SAVE_MESSAGE,
    payload: {
      chatId: chat.uuid,
      message: serverMessage,
    },
  });
  await dispatch({
    type: SelectedChatActionTypes.SAVE_MESSAGE_SELECTED_CHAT,
    payload: serverMessage,
  });
}

export async function fetchMessages(
  api: typeof Api.prototype.api,
  dispatch: any,
  chat: ChatResult,
  params: MessagesList2Params,
  messages: MessagesState
) {
  if (
    messages.status === StatusTypes.LOADING ||
    messages.status === StatusTypes.LOADING_MORE
  ) {
    console.warn("'fetchMessages' is already running");
    return;
  }
  await dispatch(updateStatus(StatusTypes.LOADING_MORE));
  const fetchedMessages = await api.messagesList2({
    ...params,
  });
  await dispatch({
    type: MessagesActionTypes.FETCH_MESSAGES,
    payload: {
      chat,
      messages: fetchedMessages,
    },
  });
  await dispatch({
    type: SelectedChatActionTypes.SELECT_MESSAGES,
    payload: fetchedMessages,
  });
  await dispatch(updateStatus(StatusTypes.LOADED));
}

export async function fetchMoreMessages(
  api: typeof Api.prototype.api,
  dispatch: any,
  chat: ChatResult,
  messages: PaginatedMessageList
) {
  // Fetches more messages (pages) of a chat
  await dispatch(updateStatus(StatusTypes.LOADING_MORE));
  const pagesTotal = messages?.pages_total || 1;
  const currentPage = messages?.next_page
    ? messages?.next_page - 1
    : pagesTotal;
  const fetchedMessages = await api.messagesList2({
    chatUuid: chat?.uuid,
    page: currentPage + 1,
    page_size: 20,
  });
  await dispatch({
    type: MessagesActionTypes.FETCH_MESSAGES,
    payload: {
      chat,
      messages: fetchedMessages,
    },
  });
  await dispatch({
    type: SelectedChatActionTypes.FETCH_MESSAGES_SELECTED_CHAT,
    payload: fetchedMessages,
  });
  await dispatch(updateStatus(StatusTypes.LOADED));
  console.log("fetchedMessages", fetchedMessages);
}

export async function markMessagesAsRead(
  api: typeof Api.prototype.api,
  dispatch: any,
  chat: ChatResult
) {
  // Marks all messages of a chat as 'read'
  const messageReadPayload: MarkChatsMessagesAsReadAction = {
    type: MessagesActionTypes.MARK_CHATS_MESSAGES_AS_READ,
    payload: {
      chatId: chat.uuid,
    },
  };
  dispatch(messageReadPayload);
}
