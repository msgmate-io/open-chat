export default ChatListNavigation;

import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";
import { RootState } from "../../store/reducer";
import { ChatListViews } from "../../store/localSettings/types";
import { setChatListView } from "../../store/localSettings/api";
import ChatSearch from "../atoms/ChatSearch";

function ChatListNavigation() {
  const dispatch = useDispatch();
  const chats = useSelector((state: RootState) => state.chats);
  const selectedChatListView = useSelector(
    (state: RootState) => state.localSettings.selectedChatListView
  );
  const selectedChat = useSelector(
    (state: RootState) => state.chats.selectedChat
  );
  return (
    <div className="w-full bg-base-300 shadow flex flex-row justify-start items-center content-center p-1 rounded-xl relative">
      <div
        className="tooltip tooltip-bottom h-full relative flex"
        data-tip="Profile & Settings"
      >
        <button
          onClick={() => {
            if (selectedChatListView == ChatListViews.LIST) {
              setChatListView(ChatListViews.PROFILE, dispatch);
            } else {
              setChatListView(ChatListViews.LIST, dispatch);
            }
          }}
          className={`btn btn-circle ${
            selectedChatListView == ChatListViews.PROFILE
              ? "btn-secondary"
              : "btn-primary"
          }`}
        >
          <div className={`w-12 h-12 rounded-xl m-1`}>
            <img
              className="mask mask-circle"
              src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            />
          </div>
        </button>
      </div>
      <div className="flex flex-row justify-end items-center content-center h-full w-full gap-2">
        <button className="btn btn-circle">
          <kbd className="kbd">+</kbd>
        </button>
        <button className="btn btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
