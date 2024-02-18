export default ChatApp;

import ChatLayout from "./chat/ChatLayout";
import UserDataLoader from "./atoms/UserDataLoader";
import ChatList from "./chat/ChatList";
import ChatView from "./chat/ChatView";
import React from "react";

function ChatApp() {
  return (
    <ChatLayout>
      <UserDataLoader />
      <ChatList />
      <ChatView />
    </ChatLayout>
  );
}
