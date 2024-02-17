export default ChatViewBase;
import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import LoadMoreMessages from "./LoadMoreMessages";
import { RootState } from "../../store/reducer";
import { useApi } from "../../pages/api/client";

function ScrollManager({ scrollContainer }) {
  const [displayJumpToBottom, setDisplayJumpToBottom] = useState(false);

  const scrollToBottom = () => {
    console.log("scrolling to bottom");
    if (scrollContainer.current)
      scrollContainer.current.scrollTop = scrollContainer.current.scrollHeight;
  };

  useEffect(() => {
    const checkTopScroll = () => {
      const top = scrollContainer.current?.scrollTop;
      const bottom =
        scrollContainer.current?.scrollHeight -
        scrollContainer.current?.scrollTop -
        scrollContainer.current?.offsetHeight;

      console.log("scrolling", top, bottom, new Date(), displayJumpToBottom);

      if (scrollContainer.current?.scrollTop < 50) {
        //console.log("Almost at the top! Fetch more messages!", new Date());
      }

      if (bottom > 100 && !displayJumpToBottom) {
        console.log("Showing");
        setDisplayJumpToBottom(true);
      }
      if (bottom < 100 && displayJumpToBottom) {
        console.log("hiding");
        setDisplayJumpToBottom(false);
      }
    };
    scrollContainer.current?.addEventListener("scroll", checkTopScroll);
    return () => {
      scrollContainer.current?.removeEventListener("scroll", checkTopScroll);
    };
  }, [scrollContainer, displayJumpToBottom]);

  return displayJumpToBottom ? (
    <div className="relative">
      <div
        className="absolute bottom-0 mb-10 ml-4 tooltip"
        data-tip="Jump down"
      >
        <div className="h-14 w-14 flex rounded-xl bg-base-300 opacity-50 hover:opacity-100 content-center items-center justify-center">
          <button className="btn btn-circle btn-ghost" onClick={scrollToBottom}>
            <kbd className="kbd">▼</kbd>
          </button>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}

function PreRenderedMessages() {
  const chatsMessages = useSelector((state: RootState) => state.messages.chat);
  const user = useSelector((state: RootState) => state.user);
  const selectedChat = useSelector(
    (state: RootState) => state.chats.selectedChat
  );

  return Object.keys(chatsMessages).map((chatUuid) => {
    return chatsMessages[chatUuid].results?.map((_message, i) => {
      return (
        <div
          className={`flex w-full h-full relative ${
            selectedChat?.uuid === chatUuid ? "" : "hidden"
          }`}
        >
          <ChatMessage
            message={_message}
            isSelf={_message.sender == user.uuid}
            key={i}
          />
        </div>
      );
    });
  });
}

function ChatViewBase() {
  const scrollContainer = useRef(null);
  const api = useApi();
  const dispatch = useDispatch();

  const chatMessages = useSelector(
    (state: RootState) => state.messages.messages
  );
  const user = useSelector((state: RootState) => state.user);
  const selectedChat = useSelector(
    (state: RootState) => state.chats.selectedChat
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
      <ScrollManager scrollContainer={scrollContainer} />
      <ChatInput
        chatUuid={selectedChat?.uuid || null}
        scrollToBottom={scrollToBottom}
      />
    </>
  );
}
