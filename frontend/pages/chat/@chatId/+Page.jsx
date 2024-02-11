import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ChatList } from "../../../atoms/chat/chat-list";
import { ChatView } from "../../../atoms/chat/chat-view";
import { ChatBox } from "../../../atoms/chat/base";
import { useApi } from "../../api/client";

export default Page;

function Page() {
  const api = useApi();
  const chats = useSelector((state) => state.chats);

  console.log();

  return (
    <ChatBox>
      <ChatList />
      <ChatView />
    </ChatBox>
  );
}
