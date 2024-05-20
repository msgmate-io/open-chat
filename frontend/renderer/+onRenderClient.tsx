export default render;
import { OpenChatContextProvider } from "#open-chat-ui/atoms/OpenChatContextProvider";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

let root;

async function render(pageContext) {
  const { Page, pageProps } = pageContext;

  const page = (
    <React.StrictMode>
      <OpenChatContextProvider
        routeParams={pageContext.routeParams}
        searchParams={pageContext.urlParsed.search}
        location="client"
      >
        <Page {...pageProps} />
      </OpenChatContextProvider>
    </React.StrictMode>
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
