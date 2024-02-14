export default LoadMoreMessages;

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchChats } from "../../store/chats/api";
import { useApi } from "../../pages/api/client";
import { RootState } from "../../store/reducer";
import { fetchMessages } from "../../store/messages/api";
import { StatusTypes } from "../../store/types";

function LoadMoreMessages() {
  const messages = useSelector((state: RootState) => state.messages);
  const selectedChat = useSelector(
    (state: RootState) => state.chats.selectedChat
  );

  const messagesStatus = useSelector(
    (state: RootState) => state.messages.status
  );

  const api = useApi();
  const dispatch = useDispatch();

  const totalItems = messages.messages?.items_total || 0;
  const pagesTotal = messages.messages?.pages_total || 1;
  const currentPage = messages.messages?.next_page
    ? messages?.messages.next_page - 1
    : pagesTotal;
  const pagesLeft = pagesTotal - currentPage;

  const moreMessagesToLoad = messages.messages?.next_page !== null;

  return (
    <div className="w-full flex flex-row px-5">
      <button
        className={`btn btn-sm btn-neutral w-full p-2 ${
          moreMessagesToLoad ? "" : "btn-disabled"
        } ${messagesStatus === StatusTypes.LOADING_MORE ? "btn-disabled" : ""}`}
        disabled={!moreMessagesToLoad}
        onClick={() => {
          fetchMessages(api, dispatch, selectedChat!, messages!);
        }}
      >
        Load more ( {pagesLeft} pages left ) current page: {currentPage} of (
        {pagesTotal}) total items: {totalItems}
      </button>
    </div>
  );
}
