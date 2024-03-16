export default ChatsSelector;

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/reducer";
import { StatusTypes } from "../../store/types";
import ChatListItem from "./ChatListItem";
import { useApi } from "../../pages/api/client";
import { fetchChats } from "../../store/chats/api";

function ChatsSelector() {
  const chats = useSelector((state: RootState) => state.chats);

  if (chats.status === StatusTypes.EMPTY) {
    return (
      <ul>
        <li className="bg-base-content skeleton h-14 shadow-xl"></li>
        <li className="bg-base-content skeleton h-14 shadow-xl"></li>
        <li className="bg-base-content skeleton h-14 shadow-xl"></li>
        <li className="bg-base-content skeleton h-14 shadow-xl"></li>
        <li className="bg-base-content skeleton h-14 shadow-xl"></li>
      </ul>
    );
  }

  return (
    <ul>
      {chats.results?.map((_chat, i) => {
        return <ChatListItem key={_chat.uuid} chat={_chat} />;
      })}
    </ul>
  );
}
