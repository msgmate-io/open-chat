export default ChatMessagesReadSendCountDown;

import React, { useEffect, useState } from "react";
const READ_SEND_COUNTDOWN_SECONDS = 5;
import CountDown, { STATUS } from "../atoms/CountDown";
import { useApi } from "../../pages/api/client";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducer";

function ChatMessagesReadSendCountDown() {
  const api = useApi();
  const [hidden, setHidden] = useState(false);
  const [readSend, setReadSend] = useState(false);
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
    setReadSend(false);
  };

  useEffect(() => {
    restartCountdown();
    setHidden(false);
  }, [selectedChat]);

  useEffect(() => {
    console.log("CHANGE status", status);
    if (status === STATUS.FINISHED) {
      if (!readSend) {
        setReadSend(true);
        api.messagesAllReadCreate(selectedChat?.uuid || "").then((res) => {
          console.log("all read", res);
        });
      }
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
