export default ChatView;

import { useSelector } from "react-redux";
import React from "react";
import { RootState } from "../../store/reducer";
import ChatViewNav from "./ChatViewNav";
import ChatViewBase from "./ChatViewBase";

export function ChatView() {
  const user = useSelector((state: RootState) => state.user);

  const selectedChatId = useSelector(
    (state: RootState) => state.messages.selectedChatId
  );

  const chatMessages = useSelector((state: RootState) => state.messages.chat);

  const selectedChatMessages = selectedChatId
    ? chatMessages[selectedChatId]
    : null;

  const selectedChat = useSelector(
    (state: RootState) =>
      state.chats.results?.find((chat) => chat.uuid == selectedChatId)
  );

  console.log("CHAT", selectedChat, selectedChatMessages);

  return (
    <div
      id="chatView"
      className={`w-full h-full bg-base-100 rounded-xl p-1 relative ${
        selectedChatId ? "" : "hidden md:block"
      }  transition-all [&.page-is-transitioning]:skew-x-1 [&.page-is-transitioning]:skew-y-1 duration-500 [&.page-is-transitioning]:duration-0 ease-in-out`}
    >
      <div className="flex flex-col h-full relative">
        <ChatViewNav
          chat={selectedChat}
          chatSelected={selectedChatId}
          infoOpen={false}
        />
        <ChatViewBase
          user={user}
          messages={selectedChatMessages}
          chatSelected={selectedChatId}
        />
      </div>
    </div>
  );
}
