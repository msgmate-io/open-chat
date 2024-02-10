import * as toolkitRaw from "@reduxjs/toolkit";
const { configureStore } = toolkitRaw.default ?? toolkitRaw;

import { rootReducer } from "./reducers";

export function getStore(PRELOADED_STATE) {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: PRELOADED_STATE,
  });
  return store;
}
