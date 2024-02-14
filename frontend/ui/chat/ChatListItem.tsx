export default ChatListItem;

import { useDispatch, useSelector } from "react-redux";
import { ChatResult } from "../../api/api";
import { selectChat } from "../../store/chats/api";
import { RootState } from "../../store/reducer";
import React from "react";

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
      className={`bg-base-100 border rounded-xl mb-2 active:-translate-y-1 ${
        isSelected ? "text-base-content shadow-inner border-2" : "shadow-md"
      }`}
    >
      <a
        onClick={() => {
          selectChat(chat, selectedChat, dispatch);
        }}
      >
        <div className="flex flex-row justify-center content-center items-center">
          <div className="avatar">
            <div className="w-10 rounded-xl">
              <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>
          <div className="flex flex-col px-4">
            <h1 className="text-xl">
              {chat.partner.first_name} {chat.partner.second_name}
            </h1>
            <h3>{chat.uuid}</h3>
          </div>
        </div>
      </a>
    </li>
  );
}
