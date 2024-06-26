export default render;
import logo from "#/assets/logo.png";
import { ServerContextProvider } from "@open-chat/open-chat-ui";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { navigateSearch } from "./navigateSearch.js";

let root;

async function render(pageContext) {
  const { Page, pageProps, passDown } = pageContext;
  console.log("PC", JSON.stringify(passDown))

  const page = (
    <React.StrictMode>
      <ServerContextProvider
        routeParams={pageContext.routeParams}
        searchParams={pageContext.urlParsed.search}
        location="client"
        sessionIdExists={passDown?.sessionIdExists || false}
        theme={passDown?.theme || "light"}
        globalContext={{
          logoUrl: logo,
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
