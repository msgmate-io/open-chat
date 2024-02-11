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

function Page() {
  const dispatch = useDispatch();

  return <ChatBox>Hello</ChatBox>;
}
