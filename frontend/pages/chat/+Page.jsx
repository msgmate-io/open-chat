import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ChatList } from "../../atoms/chat/chat-list";
import { ChatBox } from "../../atoms/chat/base";
import Cookies from "js-cookie";

export default Page;

function Page(pageProps) {
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chats);

  return (
    <ChatBox>
      <ChatList chats={chats} chatSelected={false}></ChatList>
    </ChatBox>
  );
}
