import React from "react";
import ChatLayout from "../../ui/chat/ChatLayout";
import ChatList from "../../ui/chat/ChatList";

export default Page;

function Page() {
  return (
    <ChatLayout>
      <ChatList />
    </ChatLayout>
  );
}
