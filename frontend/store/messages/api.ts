import { StatusOptions, MessagesActionTypes } from "./types";

export const updateStatus =
  (status: StatusOptions) => async (dispatch: any) => {
    dispatch({
      type: MessagesActionTypes.UPDATE_STATUS,
      payload: status,
    });
  };

export const fetchMessages = () => async (dispatch: any) => {};
