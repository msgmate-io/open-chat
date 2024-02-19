export default ChatAppRoot;

import React from "react";
import ChatLayout from "./chat/ChatLayout";
import UserDataLoader from "./atoms/UserDataLoader";
import PageContextProcessor from "./atoms/PageContextProcessor";
import ChatList from "./chat/ChatList";
import ChatView from "./chat/ChatView";

function ChatAppRoot() {
  return (
    <ChatLayout>
      <UserDataLoader />
      <ChatList />
      <ChatView />
    </ChatLayout>
  );
}
