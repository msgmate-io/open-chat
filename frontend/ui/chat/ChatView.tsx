export default ChatView;

import { useSelector } from "react-redux";
import React from "react";
import { RootState } from "../../store/reducer";
import ChatViewNav from "./ChatViewNav";
import ChatViewBase from "./ChatViewBase";
import { StatusTypes } from "../../store/types";

function transition(status: StatusTypes) {
  // [&.page-is-transitioning]:scale-95 [&.page-is-transitioning]:blur-xl
  return `transition-all ${
    status === StatusTypes.LOADING ? "blur-xl scale-95" : ""
  }`;
}

export function ChatView() {
  const messagesStatus = useSelector(
    (state: RootState) => state.messages.status
  );
  const selectedChat = useSelector(
    (state: RootState) => state.selectedChat.chat
  );

  return (
    <div
      id="chatView"
      className={`w-full h-full bg-base-100 rounded-xl p-1 relative ${
        selectedChat ? "" : "hidden md:block"
      } ${transition(messagesStatus)}`}
    >
      <div className="flex flex-col h-full relative">
        <ChatViewNav />
        <ChatViewBase />
      </div>
    </div>
  );
}
