import { messagesReducer } from "./messages/store";
import { localSettingsReducer } from "./localSettings/store";
import { chatsReducer } from "./chats/store";
import { pageContextReducer } from "./pageContext/store";
import { combineReducers } from "redux";
import { userReducer } from "./user/store";
import { tmpMessagesReducer } from "./tmpMessages/store";
import { selectedChatReducer } from "./selectedChat/store";
import { profileReducer } from "./profile/store";
import * as toolkitRaw from "@reduxjs/toolkit";
const { configureStore } = toolkitRaw.default ?? toolkitRaw;

export const rootReducer = combineReducers({
  user: userReducer,
  profile: profileReducer,

  messages: messagesReducer,
  chats: chatsReducer,
  tmpMessages: tmpMessagesReducer,
  selectedChat: selectedChatReducer,

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
