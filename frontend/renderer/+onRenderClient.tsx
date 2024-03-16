export default render;
import ReactDOM from "react-dom/client";
import React from "react";
import { getStore } from "../store/store";
import { Provider } from "react-redux";
import "./index.css";

let root;
let globalStore: null | any = null;

async function render(pageContext) {
  const { Page, pageProps } = pageContext;

  let store = globalStore;
  if (!store) {
    store = getStore(pageContext.initalReduxState);
    globalStore = store;
  }

  const page = (
    <React.StrictMode>
      <Provider store={store}>
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
