export default render;
import { Context } from "@open-chat/open-chat-ui";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

let root;

async function render(pageContext) {
  const { Page, pageProps } = pageContext;

  const page = (
    <React.StrictMode>
      <Context.ServerContextProvider
        routeParams={pageContext.routeParams}
        searchParams={pageContext.urlParsed.search}
        location="client"
      >
        <Page {...pageProps} />
      </Context.ServerContextProvider>
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
