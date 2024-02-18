export default onRenderHtml;
// See https://vike.dev/data-fetching
import ReactDOMServer from "react-dom/server";
import { renderToString } from "react-dom/server";

import React from "react";
import { PageShell } from "./PageShell";
import { escapeInject, dangerouslySkipEscape } from "vike/server";
import logoUrl from "./logo.svg";
import { getStore } from "../store/reducer";
import { Provider } from "react-redux";
import { PageContextProvider } from "./usePageContext";

import "./index.css";

async function onRenderHtml(pageContext) {
  const { Page, pageProps } = pageContext;
  let store = getStore();
  let PRELOADED_STATE = store.getState();

  if (pageContext.INJECT_REDUX_STATE) {
    store = getStore(pageContext.INJECT_REDUX_STATE);
    PRELOADED_STATE = pageContext.INJECT_REDUX_STATE;
  }

  PRELOADED_STATE = {
    ...PRELOADED_STATE,
    pageContext: {
      cookie: pageContext.requestHeaders.cookie
        ? pageContext.requestHeaders.cookie.toString()
        : "",
      xcsrfToken: pageContext.xcsrfToken
        ? pageContext.xcsrfToken.toString()
        : "",
      themeCookie: pageContext.themeCookie
        ? pageContext.themeCookie.toString()
        : "light",
      urlPathname: pageContext.urlPathname
        ? pageContext.urlPathname.toString()
        : "",
    },
  };

  // This render() hook only supports SSR, see https://vike.dev/render-modes for how to modify render() to support SPA
  let pageHtml = "";
  if (!Page) {
    // SPA mode
  } else {
    pageHtml = ReactDOMServer.renderToString(
      <PageShell pageContext={pageContext}>
        <Provider store={store}>
          <Page {...pageProps} />
        </Provider>
      </PageShell>
    );
  }

  // See https://vike.dev/head
  const { documentProps } = pageContext.exports;
  const title = (documentProps && documentProps.title) || "Vite SSR app";
  const desc =
    (documentProps && documentProps.description) || "App using Vite + Vike";
  // We might also be able to already extract the theme from cookie heder:
  const theme = pageContext.themeCookie ? pageContext.themeCookie : "light";

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en" data-theme="${theme}">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" href="${logoUrl}" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${desc}" />
        <title>${title}</title>
      </head>
      <body>
        <div id="react-root">${dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`;

  return {
    documentHtml,
    pageContext: {
      PRELOADED_STATE,
    },
  };
}
