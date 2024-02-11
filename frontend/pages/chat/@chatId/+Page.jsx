import React from "react";
import ChatLayout from "../../../ui/chat/ChatLayout";
import ChatList from "../../../ui/chat/ChatList";
import ChatView from "../../../ui/chat/ChatView";

export default Page;

function Page() {
  return (
    <ChatLayout>
      <ChatList />
      <ChatView />
    </ChatLayout>
  );
}
