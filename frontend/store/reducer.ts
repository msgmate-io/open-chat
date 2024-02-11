import { messagesReducer } from "./messages/store";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
  messages: messagesReducer,
});
