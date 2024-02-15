import {
  TmpMessagesState,
  AddOutgoingMessageAction,
  TmpMessagesActionTypes,
  RemoveOutgoingMessageAction,
} from "./types";

const initalState: TmpMessagesState = {
  outgoing: {},
  incoming: {},
};

type Action = AddOutgoingMessageAction | RemoveOutgoingMessageAction;

export function tmpMessagesReducer(
  state: TmpMessagesState = initalState,
  action: Action
): TmpMessagesState {
  switch (action.type) {
    case TmpMessagesActionTypes.ADD_OUTGOING_MESSAGE:
      const { chatId, message } = action.payload;
      return {
        ...state,
        outgoing: {
          ...state.outgoing,
          [chatId]: [...(state.outgoing[chatId] || []), message],
        },
      };
    case TmpMessagesActionTypes.REMOVE_OUTGOING_MESSAGE:
      const { chatId: chatIdToRemove, messageId } = action.payload;
      return {
        ...state,
        outgoing: {
          ...state.outgoing,
          [chatIdToRemove]: state.outgoing[chatIdToRemove].filter(
            (message) => message.uuid !== messageId
          ),
        },
      };
    default:
      return state;
  }
}
