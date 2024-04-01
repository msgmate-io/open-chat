export default onRenderHtml;
// See https://vike.dev/data-fetching
import { renderToString } from "react-dom/server";

import favicon from '@/assets/logo.png';
import React from "react";
import { Provider } from "react-redux";
import { dangerouslySkipEscape, escapeInject } from "vike/server";
import { getStore } from "../store/store";
import { BASE_PAGE_TITLE } from "./constants";

import "./index.css";

async function onRenderHtml(pageContext) {
  const { Page, pageProps } = pageContext;

  const theme = pageContext.themeCookie ? pageContext.themeCookie : "light";
  // TODO: deliberetely don't expose sessionId though I'd like tho know is its insecure to expose it? 
  // As cookie I seem not th be able to access it in browser js
  const sessionIdExists = pageContext.sessionId ? true : false;
  const initalReduxState = {
    frontend: {
      theme: theme,
      sessionId: sessionIdExists,
      xcsrfToken: pageContext.xcsrfToken,
      routeParams: pageContext.routeParams,
      resizableLayout: pageContext.resizableLayout,
    },
    pageProps: {
      routeParams: pageContext.routeParams,
      search: pageContext.urlParsed.search
    }
  }
  console.debug({ initalReduxState })
  const store = getStore(initalReduxState)

  let pageHtml = "";
  if (!Page) {
    // SPA mode
  } else {
    pageHtml = renderToString(

      <React.StrictMode>
        <Provider store={store}>
          <Page {...pageProps} />
        </Provider>
      </React.StrictMode>
    );
  }

  const { documentProps } = pageContext.exports;
  const title = (documentProps && documentProps.title) || BASE_PAGE_TITLE;
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
    pageContext: {
      initalReduxState,
    },
  };
}
