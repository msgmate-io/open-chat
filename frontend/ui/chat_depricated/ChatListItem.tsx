export default ChatListItem;

import { useDispatch, useSelector } from "react-redux";
import { ChatResult } from "../../api/api";
import { selectChat } from "../../store/chats/api";
import { RootState } from "../../store/reducer";
import React from "react";
import { useApi } from "../../pages/api/client";
import { useNavigate } from "react-router-dom";

function OnlineState({ isOnline = false }) {
  return (
    <div
      className={`badge gap-1 ${isOnline ? "badge-success" : "badge-error"}`}
    >
      {isOnline ? "online" : "offline"}
    </div>
  );
}

function ChatIndicators({ chat }: { chat: ChatResult }) {
  return (
    <div className="flex flex-grow items-center justify-end content-end gap-2">
      {chat.unread_count !== 0 && (
        <div className="badge badge-accent badge-outline">
          unreads: {chat.unread_count}
        </div>
      )}
    </div>
  );
}

function ChatListItem({ chat }: { chat: ChatResult }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const api = useApi();
  const selectedChat = useSelector(
    (state: RootState) => state.chats.selectedChat
  );

  const messages = useSelector((state: RootState) => state.messages);

  const isSelected = chat?.uuid === selectedChat?.uuid;

  if (!chat) {
    return <h1>No chat to display</h1>;
  }

  return (
    <li
      key={chat.uuid}
      className={`bg-base-100 rounded-xl mb-2 active:-translate-y-1 w-full relative ${
        isSelected ? "text-base-content shadow-inner border-2" : "shadow-md"
      }`}
    >
      <a
        className="flex relative w-full"
        onClick={() => {
          selectChat(api, chat, selectedChat, dispatch, navigate, messages);
        }}
      >
        <div className="flex flex-row w-full justify-center content-center items-center relative">
          <div className="avatar">
            <div className="w-10 rounded-xl">
              <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>
          <div className="flex w-full flex-col px-4 relative">
            <div className="flex flex-row w-full relative">
              <h1 className="text-xl whitespace-nowrap max-w-xs overflow-hidden">
                {chat.partner.first_name} {chat.partner.second_name}
              </h1>
              <ChatIndicators chat={chat} />
            </div>
            <div
              className={`flex flex-row justify-start items-center content-center w-full whitespace-nowrap max-w-48 sm:max-w-xs overflow-hidden`}
            >
              {chat?.newest_message?.text}
            </div>
          </div>
        </div>
      </a>
    </li>
  );
}
