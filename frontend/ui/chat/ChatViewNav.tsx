export default ChatViewNav;
import React from "react";

function ChatViewNav({ chat, chatSelected, infoOpen }) {
  return (
    <div className="flex flex-row bg-base-200 border rounded-xl justify-left items-center p-2 md:p-3 shadow-md">
      <a href="/chat/">
        <kbd
          className={`kbd h-10 w-10 xl:h-12 xl:w-12 ${
            chatSelected ? "lg:hidden" : ""
          }`}
        >
          ◀︎
        </kbd>
      </a>
      <div className="flex flex-col px-4">
        <h1 className="text-xl font-bold">
          {chat.partner.first_name} {chat.partner.second_name}
        </h1>
        <h3>{chat.uuid}</h3>
      </div>
    </div>
  );
}
