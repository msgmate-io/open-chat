export default render;
import React from "react";
import ReactDOM from "react-dom/client";
import { PageShell } from "./PageShell";
import { getStore } from "../store/reducer";
import { useState, useEffect } from "react";
import { Provider } from "react-redux";
import WebsocketBridge from "../WebsocketBridge";
import { number } from "prop-types";
import Cookies from "js-cookie";
import { PageContextProvider } from "./usePageContext";
import { RootState } from "../store/reducer";

import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { stat } from "fs";

const queryClient = new QueryClient();

let root;
let globalStore: null | any = null;

export function mergeReduxState(state: RootState, newState: RootState) {
  const prevChatRes = state.chats.results ? state.chats.results : [];
  const curChatRes = newState.chats.results ? newState.chats.results : [];

  const mergeChatRes = curChatRes
    .filter((chat) => {
      return !prevChatRes.some((prevChat) => prevChat.uuid === chat.uuid);
    })
    .concat(prevChatRes);

  // If a check is selected we may try to merge the messages.chat[chatId].results
  let mergedMessageRes: any = null;
  let prevMessages: any = null;
  let prevPagination: any = null;
  const newSelectedChat = newState.chats.selectedChat;
  if (newSelectedChat) {
    prevPagination = state.messages.chat[newSelectedChat?.uuid];
    prevMessages = prevPagination?.results;
    if (prevMessages) {
      console.log("PREV MESSAGES", prevMessages);
      const newMessages =
        newState.messages.chat[newSelectedChat?.uuid]?.results || [];

      mergedMessageRes = newMessages.concat(
        prevMessages.filter((message) => {
          return !newMessages.some(
            (newMessage) => newMessage.uuid === message.uuid
          );
        })
      );

      // new messages always concatinated to the start as we per default alsways load page=1
    }
  }

  let mergedMessages = {
    ...state.messages,
    ...newState.messages,
    chat: {
      ...state.messages.chat,
      ...newState.messages.chat,
    },
    messages: {
      ...state.messages.messages,
      ...newState.messages.messages,
    },
  };

  if (mergedMessageRes) {
    console.log("STATE merged Pagination", prevPagination);
    const updatedChatMessages = {
      ...prevPagination, // if an old state exists it contains the current pagination
      results: mergedMessageRes,
    };

    mergedMessages.chat[newSelectedChat?.uuid] = updatedChatMessages;
    mergedMessages.messages = updatedChatMessages;
  }

  return {
    ...state,
    ...newState,
    chats: {
      ...state.chats, // we keep the old chat pagination
      selectedChat: newState.chats.selectedChat,
      results: mergeChatRes,
    },
    messages: mergedMessages,
  };
}

async function render(pageContext) {
  const { Page, pageProps } = pageContext;

  let store = globalStore;
  if (!store) {
    // First Time Server Side Rendering
    let PRELOADED_STATE = pageContext.PRELOADED_STATE
      ? pageContext.PRELOADED_STATE
      : {};
    let INJECTED_REDUX = pageContext.INJECT_REDUX_STATE
      ? pageContext.INJECT_REDUX_STATE
      : {};

    if (pageContext.PRELOADED_STATE || pageContext.INJECT_REDUX_STATE) {
      const themeCookie = Cookies.get("localSettings_Theme");
      const INJECT_REDUX_STATE = {
        ...INJECTED_REDUX,
        ...PRELOADED_STATE,
        localSettings: themeCookie ? { theme: themeCookie } : "light",
      };

      console.log("INJECT_REDUX_STATE", INJECT_REDUX_STATE);

      const currentDocumentTheme =
        document.documentElement.getAttribute("data-theme");
      if (currentDocumentTheme !== themeCookie) {
        document.documentElement.setAttribute("data-theme", themeCookie);
      }

      store = getStore(INJECT_REDUX_STATE);
      globalStore = store;
    }
  } else if (pageContext.INJECT_REDUX_STATE) {
    // normal client side rendering
    const state = store.getState();
    const newState = mergeReduxState(state, pageContext.INJECT_REDUX_STATE);
    console.log("STATE MERGE AFTER FRONTEND NAVIGATION ===== ");
    console.log("STATE OLD", state);
    console.log("STATE NEW", pageContext.INJECT_REDUX_STATE);
    console.log("STATE MERGED", newState);
    store = getStore(newState);
    globalStore = store;
  }
  const page = (
    <PageShell pageContext={pageContext}>
      <Provider store={store}>
        <WebsocketBridge />
        <Page {...pageProps} />
      </Provider>
    </PageShell>
  );
  const container = document.getElementById("react-root");
  if (pageContext.isHydration) {
    root = ReactDOM.hydrateRoot(container, page);
  } else {
    if (!root) {
      root = ReactDOM.createRoot(container);
    }
    root.render(page);
  }
  //document.title = getPageTitle(pageContext)
}

export function onHydrationEnd(pageContext) {
  console.log(
    "Hydration finished; page is now interactive.",
    window.innerWidth,
    pageContext
  );
}
