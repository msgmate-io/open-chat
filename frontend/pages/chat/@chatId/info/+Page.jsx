import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ChatView, ChatInfo } from "../../../../atoms/chat/chat-view";
import { ChatList } from "../../../../atoms/chat/chat-list";
import { ChatBox } from "../../../../atoms/chat/base";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import Cookies from "js-cookie";

export default Page;

function Page(pageProps) {
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chats);
  const messages = useSelector((state) => state.messages);
  const user = useSelector((state) => state.user);
  const chat = useSelector((state) => state.chat);

  console.log(
    "SELECTED CHAT & CHATS & MESSAGES & USER",
    chat,
    chats,
    messages,
    user
  );

  return (
    <ChatBox>
      <ChatList chat={chat} chats={chats} chatSelected={true}></ChatList>
      <ChatInfo chat={chat} messages={messages} chatSelected={true}></ChatInfo>
    </ChatBox>
  );
}
