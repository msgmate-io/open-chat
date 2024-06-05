export default onRenderHtml;
// See https://vike.dev/data-fetching
import { renderToString } from "react-dom/server";

import favicon from '#/assets/logo.png';
import { ServerContextProvider } from "@open-chat/open-chat-ui";
import { navigateSearch } from "./navigateSearch.js";

import React from "react";
import { dangerouslySkipEscape, escapeInject } from "vike/server";

import "./index.css";

async function onRenderHtml(pageContext) {
  const { Page, pageProps } = pageContext;

  const theme = pageContext.themeCookie ? pageContext.themeCookie : "light";
  const sessionIdExists = pageContext.sessionId ? true : false;

  let pageHtml = "";
  if (!Page) {
    // SPA mode
  } else {
    pageHtml = renderToString(
      <React.StrictMode>
        <ServerContextProvider
          theme={theme}
          sessionIdExists={sessionIdExists}
          xcsrfToken={pageContext.xcsrfToken}
          resizableLayout={pageContext.resizableLayout}
          routeParams={pageContext.routeParams}
          searchParams={pageContext.urlParsed.search}
          location="server"
          globalContext={{
            logoUrl: "https://avatars.githubusercontent.com/u/163599389",
            navigate: navigateSearch
          }}
        >
          <Page {...pageProps} />
        </ServerContextProvider>
      </React.StrictMode >
    );
  }

  const { documentProps } = pageContext.exports;
  const title = (documentProps && documentProps.title) || "Open Chat";
  const desc =
    (documentProps && documentProps.description) || "Opensource Chat Interface, Backend & API";

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en" data-theme="${theme}">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${desc}" />
        <link rel="icon" href="${favicon}">
        <title>${title}</title>
      </head>
      <body>
        <div id="react-root">${dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`;

  return {
    documentHtml,
    pageContext: {/** 
      initalReduxState,
  */},
  };
}
