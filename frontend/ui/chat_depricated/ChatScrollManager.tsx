export default ChatScrollManager;

import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducer";
import { useApi } from "../../pages/api/client";
import { useDispatch } from "react-redux";
import { StatusTypes } from "../../store/types";
import { fetchMoreMessages } from "../../store/messages/api";

const HIDE_SCROLL_DOWN_THRESHOLD = 100;
const FETCH_MESSAGES_TOP_THRESHOLD = 100;

function ChatScrollManager({ scrollContainer, selectedChat }) {
  const [displayJumpToBottom, setDisplayJumpToBottom] = useState(false);
  const [isLodingMore, setIsLoadingMore] = useState(false);
  const [isInLoadRegion, setIsInLoadRegion] = useState(false);
  const [scrolledDownOnce, setScrolledDownOnce] = useState(false);
  const api = useApi();
  const dispatch = useDispatch();

  const messages = useSelector(
    (state: RootState) => state.selectedChat.messages
  );

  const messagesStatus = useSelector(
    (state: RootState) => state.messages.status
  );

  const scrollToBottom = () => {
    console.log("scrolling to bottom");
    if (scrollContainer.current)
      scrollContainer.current.scrollTop = scrollContainer.current.scrollHeight;
    if (!scrolledDownOnce) setScrolledDownOnce(true);
  };

  const checkIfInLoadMoreRegion = () => {
    return scrollContainer.current?.scrollTop < FETCH_MESSAGES_TOP_THRESHOLD;
  };

  useEffect(() => {
    setScrolledDownOnce(false);
    scrollToBottom();
  }, [selectedChat]);

  useEffect(() => {
    if (!scrolledDownOnce) return;
    if (selectedChat && !isLodingMore) {
      if (messages?.next_page === null) return;
      setIsLoadingMore(true);
      fetchMoreMessages(api, dispatch, selectedChat!, messages!)
        .then(() => {
          setIsLoadingMore(false);
          checkIfInLoadMoreRegion() && setIsInLoadRegion(true);
        })
        .catch(() => {
          setIsLoadingMore(false);
          checkIfInLoadMoreRegion() && setIsInLoadRegion(true);
        });
    }
  }, [isInLoadRegion, isLodingMore]);

  useEffect(() => {
    const checkTopScroll = () => {
      const top = scrollContainer.current?.scrollTop;
      const bottom =
        scrollContainer.current?.scrollHeight -
        scrollContainer.current?.scrollTop -
        scrollContainer.current?.offsetHeight;

      //console.log("scrolling", top, bottom, new Date(), displayJumpToBottom)
      const loadMoreRegion = checkIfInLoadMoreRegion();
      if (loadMoreRegion && !isInLoadRegion) {
        setIsInLoadRegion(true);
      } else if (!loadMoreRegion && isInLoadRegion) {
        setIsInLoadRegion(false);
      }

      if (bottom > HIDE_SCROLL_DOWN_THRESHOLD && !displayJumpToBottom) {
        setDisplayJumpToBottom(true);
      }
      if (bottom < HIDE_SCROLL_DOWN_THRESHOLD && displayJumpToBottom) {
        setDisplayJumpToBottom(false);
      }
    };
    scrollContainer.current?.addEventListener("scroll", checkTopScroll);
    return () => {
      scrollContainer.current?.removeEventListener("scroll", checkTopScroll);
    };
  }, [
    scrollContainer,
    displayJumpToBottom,
    selectedChat,
    isLodingMore,
    messages,
  ]);

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
