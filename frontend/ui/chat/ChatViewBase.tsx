export default ChatViewBase;
import React, { useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import LoadMoreMessages from "./LoadMoreMessages";

function ChatViewBase({ messages, user, chatSelected }) {
  const scrollContainer = useRef(null);
  const endOfMessages = useRef(null);

  const scrollToBottom = () => {
    const messageRef = scrollContainer.current;
    if (messageRef) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }

    const endOfMessagesRef = endOfMessages.current;
    if (endOfMessagesRef) {
      endOfMessagesRef.scrollIntoView({ behavior: "auto" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const checkTopScroll = () => {
      if (scrollContainer.current?.scrollTop < 50) {
        console.log("Almost at the top! Fetch more messages!");
      }
    };
    scrollContainer.current?.addEventListener("scroll", checkTopScroll);
    return () => {
      scrollContainer.current?.removeEventListener("scroll", checkTopScroll);
    };
  }, [scrollContainer]);

  return (
    <>
      <div ref={scrollContainer} className="w-full overflow-y-scroll">
        <LoadMoreMessages />
        {messages?.results?.toReversed().map((_message, i) => {
          return (
            <ChatMessage
              message={_message}
              isSelf={_message.sender == user.uuid}
              key={i}
            />
          );
        })}
      </div>
      <div ref={endOfMessages} className="hidden"></div>
      <ChatInput />
    </>
  );
}
