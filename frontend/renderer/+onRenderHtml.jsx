export default onRenderHtml;
// See https://vike.dev/data-fetching
import { renderToString } from "react-dom/server";

import React from "react";
import { escapeInject, dangerouslySkipEscape } from "vike/server";
import logoUrl from "./logo.svg";
import { getStore } from "../store/store";
import { Provider } from "react-redux";
import { BASE_PAGE_TITLE } from "./constants";
import favicon from '@/assets/logo.png';
import WebsocketBridge from '@/WebsocketBridge';

import "./index.css";

async function onRenderHtml(pageContext) {
  const { Page, pageProps } = pageContext;

  const theme = pageContext.themeCookie ? pageContext.themeCookie : "light";
  const initalReduxState = {
    frontend: {
      theme: theme,
      sessionId: pageContext.sessionId,
      xcsrfToken: pageContext.xcsrfToken,
      routeParams: pageContext.routeParams,
    },
    pageProps: {
      routeParams: pageContext.routeParams,
      search: pageContext.urlParsed.search
    }
  }
  console.log('initalReduxState', initalReduxState)
  const store = getStore(initalReduxState)

  // This render() hook only supports SSR, see https://vike.dev/render-modes for how to modify render() to support SPA
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

  // See https://vike.dev/head
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
