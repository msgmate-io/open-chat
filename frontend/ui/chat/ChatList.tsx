export default ChatList;

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/reducer";
import { StatusTypes } from "../../store/types";
import ThemeSelector from "../atoms/ThemeSelector";
import ChatListItem from "./ChatListItem";
import LoadMoreChats from "./LoadMoreChats";
import ChatListNavigation from "./ChatListNavigation";
import ChatSearch from "../atoms/ChatSearch";
import { useApi } from "../../pages/api/client";
import { fetchChats } from "../../store/chats/api";

function ChatListing() {
  const chats = useSelector((state: RootState) => state.chats);
  const dispatch = useDispatch();
  const api = useApi();

  useEffect(() => {
    if (chats.status === StatusTypes.EMPTY)
      fetchChats(api, dispatch, { page: 1, page_size: 20 });
  }, []);

  if (chats.status === StatusTypes.EMPTY) {
    return (
      <ul>
        <li className="bg-base-content skeleton h-14 shadow-xl"></li>
        <li className="bg-base-content skeleton h-14 shadow-xl"></li>
        <li className="bg-base-content skeleton h-14 shadow-xl"></li>
        <li className="bg-base-content skeleton h-14 shadow-xl"></li>
        <li className="bg-base-content skeleton h-14 shadow-xl"></li>
      </ul>
    );
  }

  return (
    <ul>
      {chats.results?.map((_chat, i) => {
        return <ChatListItem key={_chat.uuid} chat={_chat} />;
      })}
    </ul>
  );
}

function ChatPaginationInfo() {
  const chats = useSelector((state: RootState) => state.chats);
  if (chats.status === StatusTypes.EMPTY) {
    return <h1>Empty</h1>;
  }

  return (
    <li className="bg-base-200" key={1}>
      {chats.items_total} chats, on {chats.pages_total} pages
    </li>
  );
}

function ChatList() {
  return (
    <div
      className={`menu bg-base-200 w-full sm:max-w-md min-w-md rounded-box h-full relative block`}
    >
      <div className="flex flex-col w-full h-full max-h-full relative">
        <ChatListNavigation />
        <ChatSearch />
        <div className="overflow-y-auto relative">
          <ChatListing />
          <LoadMoreChats />
        </div>
        <div className="">
          <ul className="">
            <li className="" key={0}></li>
            <ChatPaginationInfo />
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
