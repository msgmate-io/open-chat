export default ChatViewBase;
import React, { useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

function ChatViewBase({ messages, user, chatSelected }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      <div className="w-full overflow-y-scroll">
        {messages?.results?.map((_message, i) => {
          return (
            <ChatMessage
              message={_message}
              isSelf={_message.sender == user.uuid}
              key={i}
            />
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput />
    </>
  );
}
