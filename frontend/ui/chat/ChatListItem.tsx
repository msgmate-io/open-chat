export default ChatListItem;

import { useDispatch, useSelector } from "react-redux";
import { ChatResult } from "../../api/api";
import { selectChat } from "../../store/chats/api";
import { RootState } from "../../store/reducer";
import React from "react";

function OnlineIndicator() {
  return <div className="flex flex-grow bg-info">he</div>;
}

function ChatListItem({ chatUuid }: { chatUuid: string }) {
  const dispatch = useDispatch();
  const chat = useSelector((state: RootState) => {
    return state.chats.results?.find((chat) => chat.uuid === chatUuid);
  });
  const selectedChat = useSelector(
    (state: RootState) => state.chats.selectedChat
  );

  const isSelected = chat?.uuid === selectedChat?.uuid;

  if (!chat) {
    return <h1>No chat to display</h1>;
  }

  return (
    <li
      key={chat.uuid}
      className={`bg-base-100 border rounded-xl mb-2 active:-translate-y-1 w-full relative ${
        isSelected ? "text-base-content shadow-inner border-2" : "shadow-md"
      }`}
    >
      <a
        className="flex relative w-full"
        onClick={() => {
          selectChat(chat, selectedChat, dispatch);
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
              <h1 className="text-xl">
                {chat.partner.first_name} {chat.partner.second_name}
              </h1>
              <OnlineIndicator />
            </div>
            <div
              className={`flex flex-row justify-start items-center content-center w-full max-w-full whitespace-nowrap max-w-xs overflow-hidden`}
            >
              {chat?.newest_message?.text}
            </div>
          </div>
        </div>
      </a>
    </li>
  );
}
