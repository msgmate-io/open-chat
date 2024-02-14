import { MessagesActionTypes } from "./types";
import { StatusTypes } from "../types";
import { Api } from "../../api/api";
import { ChatResult, PaginatedMessageList } from "../../api/api";
import { MessagesState } from "./types";

export const updateStatus = (status: StatusTypes) => async (dispatch: any) => {
  dispatch({
    type: MessagesActionTypes.UPDATE_STATUS,
    payload: status,
  });
};

export async function fetchMessages(
  api: typeof Api.prototype.api,
  dispatch: any,
  chat: ChatResult,
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
  const pagesTotal = messages.messages?.pages_total || 1;
  const currentPage = messages.messages?.next_page
    ? messages.messages?.next_page - 1
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
  await dispatch(updateStatus(StatusTypes.LOADED));
  console.log("fetchedMessages", fetchedMessages);
}
