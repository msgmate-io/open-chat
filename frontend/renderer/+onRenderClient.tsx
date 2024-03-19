export default render;
import ReactDOM from "react-dom/client";
import React from "react";
import { fetchPageProps, getStore } from "../store/store";
import { Provider } from "react-redux";
import "./index.css";

let root;
let globalStore: null | any = null;

async function render(pageContext) {
  const { Page, pageProps } = pageContext;

  if (!globalStore) {
    globalStore = getStore({
      ...pageContext.initalReduxState
    });
  } else {
    if (typeof window !== "undefined") {
      // on client side navigation always update 'pageProps'
      globalStore = getStore({
        ...globalStore.getState(),
        pageProps: {
          routeParams: pageContext.routeParams,
          search: pageContext.urlParsed.search
        }
      });
    }
  }

  const page = (
    <React.StrictMode>
      <Provider store={globalStore}>
        <Page {...pageProps} />
      </Provider>
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
