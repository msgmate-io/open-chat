import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ChatView } from "../../../atoms/chat/chat-view";
import { ChatList } from "../../../atoms/chat/chat-list";
import { ChatBox } from "../../../atoms/chat/base";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ChatSplit } from "../../../atoms/chat-split";
import Cookies from "js-cookie";

export default Page;

function Page(pageProps) {
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chats);
  const messages = useSelector((state) => state.messages);
  const user = useSelector((state) => state.user);
  const chat = useSelector((state) => state.chat);
  const sendMessage = useQuery({
    queryKey: ["messageSend"],
    queryFn: async () => {
      return await fetch(`/api/chat/${chat.uuid}/send`, {
        headers: {
          "X-CSRFToken": pageProps.xcsrfToken,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          message: "Test message",
        }),
      });
    },
    refetchOnWindowFocus: false,
    enabled: false,
  });

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
      <ChatView
        chat={chat}
        messages={messages}
        user={user}
        chatSelected={true}
      ></ChatView>
    </ChatBox>
  );
}
