export default ChatViewInfo;
import React from "react";
import ChatViewNav from "./ChatViewNav";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducer";

function ChatViewInfo() {
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
  return (
    <div
      className={`w-full h-full bg-base-100 rounded-xl p-1 relative ${
        selectedChatId ? "" : "hidden md:block"
      }`}
    >
      <div className="flex flex-col h-full relative">
        <ChatViewNav
          chat={selectedChat}
          chatSelected={selectedChatId}
          infoOpen={true}
        />
        <div className="flex flex-col h-full bg-error rounded-xl">he</div>
      </div>
    </div>
  );
}
