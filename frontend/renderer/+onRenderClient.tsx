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
  return {
    ...state,
    ...newState,
    chats: {
      ...state.chats, // we keep the old chat pagination
      selectedChat: newState.chats.selectedChat,
      results: mergeChatRes,
    },
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
