import React, { useEffect } from "react";
import { navigate } from "vike/client/router";
import { redirect } from "vike/abort";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { StatusTypes } from "../../store/types";
import { RootState } from "../../store/reducer";
import { ChatResult } from "../../api/api";

export function ChatListItem({ chat }: { chat: ChatResult }) {
  const isSelected = false;

  return (
    <li
      key={chat.uuid}
      className={`bg-base-100 border rounded-xl mb-2 active:-translate-y-1 ${
        isSelected ? "text-base-content shadow-inner border-2" : "shadow-md"
      }`}
    >
      <a href={`/chat/${chat.uuid}/`}>
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

function ThemeSelector() {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.localSettings?.theme);

  useEffect(() => {
    const currentDocumentTheme =
      document.documentElement.getAttribute("data-theme");

    if (currentDocumentTheme !== theme) {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme]);

  return (
    <select
      onChange={(e) => {
        console.log("THEME", e.target.value);
        dispatch({
          type: "changeTheme",
          payload: e.target.value,
        });
        Cookies.set("localSettings_Theme", e.target.value);
      }}
      value={theme}
      className="select w-full"
    >
      <option>dark</option>
      <option>light</option>
      <option>cupcake</option>
      <option>retro</option>
    </select>
  );
}

export function ChatList() {
  const chats = useSelector((state: RootState) => state.chats);

  if (chats.status === StatusTypes.EMPTY) {
    return <h1>Empty</h1>;
  }

  if (chats.status === StatusTypes.ERROR) {
    return <h1>Error</h1>;
  }

  if (chats.status === StatusTypes.LOADING) {
    return <h1>Loading ...</h1>;
  }

  return (
    <ul
      className={`menu bg-base-200 w-full sm:max-w-md min-w-md rounded-box ${
        false ? "hidden lg:block" : ""
      }`}
    >
      {chats.results?.map((_chat, i) => {
        return <ChatListItem key={_chat.uuid} chat={_chat} />;
      })}
      <li className="" key={0}></li>
      <li className="bg-base-200" key={1}>
        {chats.items_total} chats, on {chats.pages_total} pages
      </li>
      <li className="" key={2}></li>
      <li className="relative w-full" key={3}>
        <ThemeSelector />
      </li>
    </ul>
  );
}
