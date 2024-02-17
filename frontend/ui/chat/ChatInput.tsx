export default ChatInput;

import React, { useEffect, useRef } from "react";
import { sendMessage } from "../../store/messages/api";
import { useDispatch, useSelector } from "react-redux";
import { useApi } from "../../pages/api/client";
import { RootState } from "../../store/reducer";
import { SendMessage } from "../../api/api";

function ChatInput({
  chatUuid,
  scrollToBottom,
}: {
  chatUuid: string | null;
  scrollToBottom: () => void;
}) {
  const user = useSelector((state: RootState) => state.user);
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const api = useApi();

  const chat = useSelector((state: RootState) => {
    return state.chats.results?.find((chat) => chat.uuid === chatUuid);
  });

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      console.log("KEY", event);
      if (event.key === "Enter") {
        const message: SendMessage = {
          text: inputRef.current.value,
        };
        sendMessage(api, dispatch, user, chat!, message).then(() => {
          inputRef.current.value = "";
          scrollToBottom();
        });
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  if (!chat) {
    return <h1>No chat to display</h1>;
  }

  return (
    <div className="bg-base-200 h-fit flex flex-row w-full rounded-xl mt-2 p-2 gap-2">
      <textarea
        ref={inputRef}
        className="textarea flex flex-grow bg-base-200 leading-5 resize-none focus:resize-y h-6 focus:h-32"
        placeholder="Send a message"
      ></textarea>
      <div className="flex flex-row content-center items-center justify-end">
        <button
          className="btn btn-lg bg-base-300 shadow-xl"
          onClick={() => {
            const message: SendMessage = {
              text: inputRef.current.value,
            };
            sendMessage(api, dispatch, user, chat!, message).then(() => {
              inputRef.current.value = "";
              scrollToBottom();
            });
          }}
        >
          <div className="flex flex-col gap-1">
            send
            <kbd className="kbd kbd-xs">enter</kbd>
          </div>
        </button>
      </div>
    </div>
  );
}
