export default render;
import { ServerContextProvider } from "@open-chat/open-chat-ui";
import Cookies from "js-cookie";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { navigateSearch } from "./navigateSearch.js";

let root;

async function render(pageContext) {
  const { Page, pageProps } = pageContext;

  const page = (
    <React.StrictMode>
      <ServerContextProvider
        routeParams={pageContext.routeParams}
        searchParams={pageContext.urlParsed.search}
        location="client"
        theme={Cookies.get("theme") || "light"}
        globalContext={{
          logoUrl: "https://avatars.githubusercontent.com/u/163599389",
          navigate: navigateSearch
        }}
      >
        <Page {...pageProps} />
      </ServerContextProvider>
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
