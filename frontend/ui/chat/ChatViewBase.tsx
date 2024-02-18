export default ChatViewBase;

import ChatScrollManager from "./ChatScrollManager";
import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import LoadMoreMessages from "./LoadMoreMessages";
import { RootState } from "../../store/reducer";
import { useApi } from "../../pages/api/client";
import CountDown, { STATUS } from "../atoms/CountDown";

const READ_SEND_COUNTDOWN_SECONDS = 5;

function ReadSendCountdown() {
  const [hidden, setHidden] = useState(false);
  const selectedChat = useSelector(
    (state: RootState) => state.selectedChat.chat
  );

  const [status, setStatus] = useState(STATUS.STARTED);
  const [secondsRemaining, setSecondsRemaining] = useState(
    READ_SEND_COUNTDOWN_SECONDS
  );

  const restartCountdown = () => {
    setSecondsRemaining(READ_SEND_COUNTDOWN_SECONDS);
    setStatus(STATUS.STARTED);
  };

  useEffect(() => {
    restartCountdown();
    setHidden(false);
  }, [selectedChat]);

  useEffect(() => {
    console.log("CHANGE status", status);
    if (status === STATUS.FINISHED) {
      setTimeout(() => {
        setHidden(true);
      }, 1000);
    }
  }, [status]);

  return (
    <div className={`relative ${hidden ? "hidden" : ""}`}>
      <div
        className={`absolute bottom-0 mb-28 ml-4 tooltip ${
          status === STATUS.FINISHED ? "animate-ping" : "animate-pulse"
        }`}
        data-tip={
          status === STATUS.FINISHED ? "To late to cancel" : "Click to cancel"
        }
      >
        <div
          className={`h-10 w-34 flex rounded-xl bg-base-300 opacity-50 hover:opacity-100 content-center items-center justify-center p-2 ${
            status === STATUS.FINISHED ? "bg-base-100" : ""
          }`}
        >
          <button className="btn btn-circle btn-ghost" onClick={() => {}}>
            <kbd className="kbd">▼</kbd>
          </button>
          <div className="flex flex-col">
            <span className="text-xs">
              {status === STATUS.FINISHED
                ? "Sending 'read' ..."
                : "Sending 'read' in"}
            </span>
            <div className={status === STATUS.FINISHED ? "hidden" : ""}>
              <CountDown
                status={status}
                setStatus={setStatus}
                secondsRemaining={secondsRemaining}
                setSecondsRemaining={setSecondsRemaining}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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
      <ReadSendCountdown />
      <ChatInput
        chatUuid={selectedChat?.uuid || null}
        scrollToBottom={scrollToBottom}
      />
    </>
  );
}
