export default ChatList;

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducer";
import { StatusTypes } from "../../store/types";
import ThemeSelector from "../atoms/ThemeSelector";
import ChatListItem from "./ChatListItem";

function ChatList() {
  const chats = useSelector((state: RootState) => state.chats);
  const selectedChatId = useSelector(
    (state: RootState) => state.messages.selectedChatId
  );

  if (chats.status === StatusTypes.EMPTY) {
    return <h1>Empty</h1>;
  }

  if (chats.status === StatusTypes.ERROR) {
    return <h1>Error</h1>;
  }

  if (chats.status === StatusTypes.LOADING) {
    return <h1>Loading ...</h1>;
  }

  return (
    <ul
      className={`menu bg-base-200 w-full sm:max-w-md min-w-md rounded-box ${
        selectedChatId ? "hidden lg:block" : ""
      }`}
    >
      {chats.results?.map((_chat, i) => {
        return (
          <ChatListItem
            key={_chat.uuid}
            chat={_chat}
            isSelected={_chat.uuid === selectedChatId}
          />
        );
      })}
      <li className="" key={0}></li>
      <li className="bg-base-200" key={1}>
        {chats.items_total} chats, on {chats.pages_total} pages
      </li>
      <li className="" key={2}></li>
      <li className="relative w-full" key={3}>
        <ThemeSelector />
      </li>
    </ul>
  );
}
