import { Message } from "../../api/api";
const initialState = {};

interface TmpMessagesState {
  outgoing: {
    [chatId: string]: Message[];
  };
  incoming: {
    [chatId: string]: Message[];
  };
}

const initalState: TmpMessagesState = {
  outgoing: {},
  incoming: {},
};

export function tmpMessagesReducer(state: any = initialState, action): any {
  switch (action.type) {
    default:
      return state;
  }
}
