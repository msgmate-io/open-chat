export default ChatListNavigation;

import { useSelector } from "react-redux";
import React, { useState } from "react";
import { RootState } from "../../store/reducer";
import { ChatListViews } from "../../store/localSettings/store";
import ChatSearch from "../atoms/ChatSearch";

function ChatListNavigation() {
  const chats = useSelector((state: RootState) => state.chats);
  const [viewActive, setViewActive] = useState<ChatListViews>(
    ChatListViews.LIST
  );
  const selectedChat = useSelector(
    (state: RootState) => state.chats.selectedChat
  );
  return (
    <div className="w-full bg-base-300 shadow flex flex-row justify-start items-center content-center p-1 rounded-xl relative">
      <div className="tooltip tooltip-bottom" data-tip="Profile & Settings">
        <a
          onClick={() => {
            if (viewActive == ChatListViews.LIST) {
              setViewActive(ChatListViews.PROFILE);
            } else {
              setViewActive(ChatListViews.LIST);
            }
          }}
          className={`avatar rounded-xl`}
        >
          <div
            className={`w-12 rounded-xl ${
              viewActive == "profile" ? "border-2 border-error" : "border-2"
            }`}
          >
            <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          </div>
        </a>
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
