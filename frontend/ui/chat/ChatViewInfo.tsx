export default ChatViewInfo;
import React from "react";
import ChatViewNav from "./ChatViewNav";

function ChatViewInfo({ chat, chatSelected }) {
  return (
    <div
      className={`w-full h-full bg-base-100 rounded-xl p-1 relative ${
        chatSelected ? "" : "hidden md:block"
      }`}
    >
      <div className="flex flex-col h-full relative">
        <ChatViewNav chat={chat} chatSelected={chatSelected} infoOpen={true} />
        <div className="flex flex-col h-full bg-error rounded-xl">he</div>
      </div>
    </div>
  );
}
