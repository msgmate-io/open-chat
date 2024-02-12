export default ChatList;

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/reducer";
import { StatusTypes } from "../../store/types";
import ThemeSelector from "../atoms/ThemeSelector";
import ChatListItem from "./ChatListItem";
import { fetchChats } from "../../store/chats/api";
import { PaginatedChatResultList } from "../../api/api";
import { useApi } from "../../pages/api/client";

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
          fetchChats(api, dispatch, { page: currentPage + 1 });
        }}
      >
        Load more ( {pagesLeft} pages left )
      </button>
    </div>
  );
}

function ChatList() {
  const chats = useSelector((state: RootState) => state.chats);
  const selectedChat = useSelector(
    (state: RootState) => state.chats.selectedChat
  );

  if (chats.status === StatusTypes.EMPTY) {
    return <h1>Empty</h1>;
  }

  return (
    <div
      className={`menu bg-base-200 w-full sm:max-w-md min-w-md rounded-box h-full relative ${
        selectedChat ? "hidden lg:block" : ""
      }`}
    >
      <div className="flex flex-col w-full h-full max-h-full relative">
        <div className="overflow-y-auto relative">
          <ul>
            {chats.results?.map((_chat, i) => {
              return (
                <ChatListItem
                  key={_chat.uuid}
                  chat={_chat}
                  isSelected={_chat.uuid === selectedChat?.uuid}
                />
              );
            })}
          </ul>
          <LoadMoreChats />
        </div>
        <div className="">
          <ul className="">
            <li className="" key={0}></li>
            <li className="bg-base-200" key={1}>
              {chats.items_total} chats, on {chats.pages_total} pages
            </li>
            <li className="" key={2}></li>
            <li className="relative w-full" key={3}>
              <ThemeSelector />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
