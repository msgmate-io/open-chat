import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { WEBSOCKET_PROTOCOLL } from "./renderer/constants";
import { insertMessage } from "./store/messages";
import { updateNewestMessage } from "./store/chats";

const CORE_WS_PATH = "/api/core/ws";

const useCustomEventHandler = (dispatch) => {
  return {
    userWentOnline: (payload) => {
      console.debug("User went online", payload);
    },
    newMessage: (payload) => {
      const { chat, message, senderId } = payload;
      console.debug("New message", { chat, message, senderId });
      dispatch(insertMessage({
        chatId: chat.uuid,
        message: message
      }));
      dispatch(updateNewestMessage({
        chatId: chat.uuid,
        message: message
      }));
    }
  }
};

const WebsocketBridge = () => {
  /**
   * Esablishes a websocket connection with the backend
   * This can be used to transmit any event from server to client
   * e.g.: client data can be cahnges by sending a message like: {
   * event: "reduction",
   * payload: {...}
   * } --> this will triger a simple redux dispatch in the frontend
   */
  const dispatch = useDispatch();
  const customEventHandler = useCustomEventHandler(dispatch);
  const [socketUrl, setSocketUrl] = useState(
    WEBSOCKET_PROTOCOLL + "localhost" + CORE_WS_PATH
  );
  const [messageHistory, setMessageHistory] = useState([]);
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  const handleIncomingMessage = (message) => {
    if (message.type === "custom") {
      customEventHandler[message.data.action](message.data.payload);
    } else if (message.type === "reduction") {
      dispatch({
        type: message.data.action,
        payload: message.data.payload,
      })
    }
  }

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastMessage));
      const message = JSON.parse(lastMessage.data);
      try {
        handleIncomingMessage(message);
      } catch (e) {
        console.warn("Failed to handle incoming message", e, message)
      }
    }
  }, [lastMessage, setMessageHistory]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];
  console.debug("SOCKET UPDATED", connectionStatus);

  return null;
};

export default WebsocketBridge;
