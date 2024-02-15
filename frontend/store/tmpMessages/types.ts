import { Message } from "../../api/api";

export enum TmpMessagesActionTypes {
  ADD_OUTGOING_MESSAGE = "ADD_OUTGOING_MESSAGE",
  REMOVE_OUTGOING_MESSAGE = "REMOVE_OUTGOING_MESSAGE",
}

export interface AddOutgoingMessageAction {
  type: TmpMessagesActionTypes.ADD_OUTGOING_MESSAGE;
  payload: {
    chatId: string;
    message: Message;
  };
}

export interface RemoveOutgoingMessageAction {
  type: TmpMessagesActionTypes.REMOVE_OUTGOING_MESSAGE;
  payload: {
    chatId: string;
    messageId: string;
  };
}

export interface TmpMessagesState {
  outgoing: {
    [chatId: string]: Message[];
  };
  incoming: {
    [chatId: string]: Message[];
  };
}
