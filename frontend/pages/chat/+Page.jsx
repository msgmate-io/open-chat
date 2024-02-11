import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ChatBox } from "../../atoms/chat/base";
import { ChatList } from "../../atoms/chat/chat-list";
import Cookies from "js-cookie";
import { useApi } from "../api/client";

export default Page;

function Page() {
  const api = useApi();
  const chats = useSelector((state) => state.chats);

  console.log("CHATS", chats);

  return (
    <ChatBox>
      <ChatList chats={chats} />
    </ChatBox>
  );
}
