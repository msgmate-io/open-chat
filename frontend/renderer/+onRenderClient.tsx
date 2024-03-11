export default render;
import ReactDOM from "react-dom/client";
import { PageShell } from "./PageShell";
import { getStore } from "../store/reducer";
import { Provider } from "react-redux";
import Cookies from "js-cookie";
import { LocalSettingsState } from "../store/localSettings/types";
import { initialState as initialSettingsState } from "../store/localSettings/store";
import "./index.css";

let root;
let globalStore: null | any = null;

async function render(pageContext) {
  const { Page, pageProps } = pageContext;

  let store = globalStore;
  if (!store) {
    // First Time Server Side Rendering
    let PRELOADED_STATE = pageContext.PRELOADED_STATE
      ? pageContext.PRELOADED_STATE
      : {};

    if (pageContext.PRELOADED_STATE) {
      const themeCookie = Cookies.get("localSettings_Theme");
      // TODO: set default inital theme cookie
      //

      const localSettings: LocalSettingsState = {
        ...initialSettingsState,
        theme: themeCookie ? themeCookie : "light",
      };

      const INJECT_REDUX_STATE = {
        ...PRELOADED_STATE,
        localSettings,
      };

      console.info("MANUAL RELOAD, injected state: ", INJECT_REDUX_STATE);

      const currentDocumentTheme =
        document.documentElement.getAttribute("data-theme");
      if (currentDocumentTheme !== themeCookie) {
        document.documentElement.setAttribute("data-theme", themeCookie);
      }

      store = getStore(INJECT_REDUX_STATE);
      globalStore = store;
    }
  }

  const page = (
    <PageShell pageContext={pageContext}>
      <Provider store={store}>
        <Page {...pageProps} />
      </Provider>
    </PageShell>
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
