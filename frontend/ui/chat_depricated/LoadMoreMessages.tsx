export default LoadMoreMessages;

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useApi } from "../../pages/api/client";
import { RootState } from "../../store/reducer";
import { StatusTypes } from "../../store/types";
import { fetchMoreMessages } from "../../store/messages/api";

function LoadMoreMessages() {
  const api = useApi();
  const dispatch = useDispatch();
  const cachedMessages = useSelector((state: RootState) => state.messages);

  const messages = useSelector(
    (state: RootState) => state.selectedChat.messages
  );
  const selectedChat = useSelector(
    (state: RootState) => state.selectedChat.chat
  );

  const messagesStatus = useSelector(
    (state: RootState) => state.messages.status
  );

  const totalItems = messages?.items_total || 0;
  const pagesTotal = messages?.pages_total || 1;
  const currentPage = messages?.next_page
    ? messages?.next_page - 1
    : pagesTotal;
  const pagesLeft = pagesTotal - currentPage;

  const moreMessagesToLoad = messages?.next_page !== null;

  return (
    <div className="w-full flex flex-row px-5">
      <button
        className={`btn btn-sm btn-neutral w-full p-2 ${
          moreMessagesToLoad ? "" : "btn-disabled"
        } ${messagesStatus === StatusTypes.LOADING_MORE ? "btn-disabled" : ""}`}
        disabled={!moreMessagesToLoad}
        onClick={() => {
          fetchMoreMessages(api, dispatch, selectedChat!, messages!);
        }}
      >
        Load more ( {pagesLeft} pages left ) current page: {currentPage} of (
        {pagesTotal}) total items: {totalItems}
      </button>
    </div>
  );
}
