import React from "react";
import ChatLayout from "../../ui/chat/ChatLayout";
import ChatList from "../../ui/chat/ChatList";
import ChatView from "../../ui/chat/ChatView";
import UserDataLoader from "../../ui/atoms/UserDataLoader";

export default Page;

function Page() {
  return (
    <ChatLayout>
      <UserDataLoader />
      <ChatList />
      <ChatView />
    </ChatLayout>
  );
}
