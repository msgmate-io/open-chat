export default LoadMoreChats;

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchChats } from "../../store/chats/api";
import { useApi } from "../../pages/api/client";
import { RootState } from "../../store/reducer";

function LoadMoreChats() {
  const chats = useSelector((state: RootState) => state.chats);
  const api = useApi();
  const dispatch = useDispatch();

  const pagesTotal = chats.pages_total || 1;
  const currentPage = chats.next_page ? chats.next_page - 1 : pagesTotal;
  const pagesLeft = pagesTotal - currentPage;

  const moreMessagesToLoad = chats.next_page !== null;

  return (
    <div className="w-full flex flex-row px-5">
      <button
        className={`btn btn-sm btn-neutral w-full p-2 ${
          moreMessagesToLoad ? "" : "btn-disabled"
        }`}
        disabled={!moreMessagesToLoad}
        onClick={() => {
          fetchChats(api, dispatch, { page: chats.next_page });
        }}
      >
        Load more ( {pagesLeft} pages left )
      </button>
    </div>
  );
}
