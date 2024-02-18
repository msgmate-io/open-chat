export default ChatPaginationInfo;

import React from "react";
import { useSelector } from "react-redux";
import { StatusTypes } from "../../store/types";
import { RootState } from "../../store/reducer";

function ChatPaginationInfo() {
  const chats = useSelector((state: RootState) => state.chats);
  if (chats.status === StatusTypes.EMPTY) {
    return <h1>Empty</h1>;
  }

  return (
    <li className="bg-base-200" key={1}>
      {chats.items_total} chats, on {chats.pages_total} pages
    </li>
  );
}
