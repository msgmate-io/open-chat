export default render;
import React from "react";
import ReactDOM from "react-dom/client";
import { PageShell } from "./PageShell";
import { getStore } from "./store/store";
import { useState, useEffect } from "react";
import { Provider } from "react-redux";
import WebsocketBridge from "../atoms/websocket-bridge";
import { number } from "prop-types";
import Cookies from "js-cookie";

import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

let root;
let globalStore = null;
console.log("GLOB STORE", globalStore);
async function render(pageContext) {
  const { Page, pageProps } = pageContext;

  console.log(
    "GLOBAL STORE",
    globalStore,
    pageContext.PRELOADED_STATE,
    pageContext.INJECT_REDUX_STATE
  );

  let store = globalStore;
  if (!store) {
    if (pageContext.PRELOADED_STATE)
      store = getStore(pageContext.PRELOADED_STATE);
    else store = getStore();
    globalStore = store;
  }

  if (pageContext.INJECT_REDUX_STATE) {
    const themeCookie = Cookies.get("localSettings_Theme");
    const INJECT_REDUX_STATE = {
      ...pageContext.INJECT_REDUX_STATE,
      localSettings: themeCookie ? { theme: themeCookie } : "light",
    };

    const currentDocumentTheme =
      document.documentElement.getAttribute("data-theme");
    if (currentDocumentTheme !== themeCookie) {
      document.documentElement.setAttribute("data-theme", themeCookie);
    }

    store = getStore(INJECT_REDUX_STATE);
    globalStore = store;
  }
  let state = store.getState();

  const page = (
    <PageShell pageContext={pageContext}>
      <QueryClientProvider client={queryClient} contextSharing={true}>
        <Provider store={store}>
          <WebsocketBridge />
          <Page {...pageProps} />
        </Provider>
      </QueryClientProvider>
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
