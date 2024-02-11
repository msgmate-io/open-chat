export const initialState: MessagesState = {
  status: StatusOptions.EMPTY,
  errors: null,
  results: [],
  previous: null,
  next: null,
};

interface UpdateStatusAction {
  type: MessagesActionTypes.UPDATE_STATUS;
  payload: StatusOptions;
}

type Action = UpdateStatusAction;
export function chatsReducer(
  state: MessagesState = initialState,
  action: Action
): MessagesState {
  switch (action.type) {
    case MessagesActionTypes.UPDATE_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
}
