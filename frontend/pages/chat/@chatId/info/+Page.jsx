import React, { useEffect } from "react";
import ChatList from "../../../../ui/chat/ChatList";
import ChatLayout from "../../../../ui/chat/ChatLayout";
import ChatViewInfo from "../../../../ui/chat/ChatViewInfo";

export default Page;

function Page() {
  return (
    <ChatLayout>
      <ChatList />
      <ChatViewInfo />
    </ChatLayout>
  );
}
