export default ChatViewBase;

import ChatScrollManager from "./ChatScrollManager";
import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import LoadMoreMessages from "./LoadMoreMessages";
import { RootState } from "../../store/reducer";
import { useApi } from "../../pages/api/client";
import ChatMessagesReadSendCountDown from "./ChatMessagesReadSendCountDown";

function ChatViewBase() {
  const scrollContainer = useRef(null);
  const api = useApi();
  const dispatch = useDispatch();

  const chatMessages = useSelector(
    (state: RootState) => state.selectedChat.messages
  );
  const user = useSelector((state: RootState) => state.user);
  const selectedChat = useSelector(
    (state: RootState) => state.selectedChat.chat
  );
  const outgoingMessages = useSelector(
    (state: RootState) => state.tmpMessages.outgoing
  );
  const outgoingChat = outgoingMessages[selectedChat?.uuid || ""] || [];

  const scrollToBottom = () => {
    console.log("scrolling to bottom");
    if (scrollContainer.current)
      scrollContainer.current.scrollTop = scrollContainer.current.scrollHeight;
  };

  return (
    <>
      <div
        ref={scrollContainer}
        id="messageScroll"
        className="w-full overflow-y-scroll px-2 relative"
      >
        <LoadMoreMessages />
        {chatMessages?.results?.toReversed().map((_message, i) => {
          return (
            <ChatMessage
              message={_message}
              isSelf={_message.sender == user.uuid}
              key={i}
            />
          );
        })}
        {outgoingChat?.map((_message, i) => {
          return (
            <ChatMessage
              isTmpMessage={true}
              message={_message}
              isSelf={_message.sender == user.uuid}
              key={i}
            />
          );
        })}
      </div>
      <ChatScrollManager
        scrollContainer={scrollContainer}
        selectedChat={selectedChat}
      />
      {selectedChat?.unread_count !== 0 && <ChatMessagesReadSendCountDown />}
      <ChatInput
        chatUuid={selectedChat?.uuid || null}
        scrollToBottom={scrollToBottom}
      />
    </>
  );
}
