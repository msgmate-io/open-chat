export default ChatViewNav;
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducer";

function ChatViewNav() {
  const selectedChat = useSelector(
    (state: RootState) => state.chats.selectedChat
  );

  if (!selectedChat) {
    return (
      <div className="flex flex-row bg-base-200 border rounded-xl justify-left items-center p-2 md:p-3 shadow-md">
        No chat selected
      </div>
    );
  }

  return (
    <div className="flex flex-row bg-base-200 border rounded-xl justify-left items-center p-2 md:p-3 shadow-md">
      <a href="/chat/">
        <kbd
          className={`kbd h-10 w-10 xl:h-12 xl:w-12 ${
            selectedChat ? "lg:hidden" : ""
          }`}
        >
          ◀︎
        </kbd>
      </a>
      <div className="flex flex-col px-4">
        <h1 className="text-xl font-bold">
          {selectedChat.partner.first_name} {selectedChat.partner.second_name}
        </h1>
        <h3>{selectedChat.uuid}</h3>
      </div>
    </div>
  );
}
