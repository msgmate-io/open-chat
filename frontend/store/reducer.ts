import { messagesReducer } from "./messages/store";
import { localSettingsReducer } from "./localSettings/store";
import { chatsReducer } from "./chats/store";
import { pageContextReducer } from "./pageContext/store";
import { combineReducers } from "redux";
import { userReducer } from "./user/store";
import * as toolkitRaw from "@reduxjs/toolkit";
const { configureStore } = toolkitRaw.default ?? toolkitRaw;

export const rootReducer = combineReducers({
  messages: messagesReducer,
  chats: chatsReducer,
  user: userReducer,
  localSettings: localSettingsReducer,
  pageContext: pageContextReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export function getStore(PRELOADED_STATE) {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: PRELOADED_STATE,
  });
  return store;
}
