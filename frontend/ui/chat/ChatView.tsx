export default ChatView;

import { useSelector } from "react-redux";
import React from "react";
import { RootState } from "../../store/reducer";
import ChatViewNav from "./ChatViewNav";
import ChatViewBase from "./ChatViewBase";

export function ChatView() {
  const user = useSelector((state: RootState) => state.user);
  const messages = useSelector((state: RootState) => state.messages.messages);
  const selectedChat = useSelector(
    (state: RootState) => state.chats.selectedChat
  );

  return (
    <div
      id="chatView"
      className={`w-full h-full bg-base-100 rounded-xl p-1 relative ${
        selectedChat ? "" : "hidden md:block"
      }  transition-all [&.page-is-transitioning]:scale-95 [&.page-is-transitioning]:blur-xl`}
    >
      <div className="flex flex-col h-full relative">
        <ChatViewNav />
        <ChatViewBase
          user={user}
          messages={messages}
          chatSelected={selectedChat}
        />
      </div>
    </div>
  );
}
