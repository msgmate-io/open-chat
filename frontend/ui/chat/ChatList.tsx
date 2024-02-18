export default ChatList;

import React from "react";
import ThemeSelector from "../atoms/ThemeSelector";
import LoadMoreChats from "./LoadMoreChats";
import ChatListNavigation from "./ChatListNavigation";
import ChatSearch from "../atoms/ChatSearch";
import ChatPaginationInfo from "../atoms/ChatPaginationInfo";
import ChatsSelector from "./ChatsSelector";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducer";
import { ChatListViews } from "../../store/localSettings/types";
import ListViewProfile from "./ListViewProfile";

function ChatList() {
  const selectedChatListView = useSelector(
    (state: RootState) => state.localSettings.selectedChatListView
  );

  return (
    <div
      className={`menu bg-base-200 w-full sm:max-w-md min-w-md rounded-box h-full relative block`}
    >
      <div className="flex flex-col w-full h-full max-h-full relative">
        <ChatListNavigation />
        {selectedChatListView === ChatListViews.LIST && (
          <>
            <ChatSearch />
            <div className="overflow-y-auto relative">
              <ChatsSelector />
              <LoadMoreChats />
            </div>
          </>
        )}
        {selectedChatListView === ChatListViews.PROFILE && <ListViewProfile />}
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
