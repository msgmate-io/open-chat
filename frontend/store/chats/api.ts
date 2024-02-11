import { ChatsActionTypes } from "./types";
import { StatusTypes } from "../types";
import { getApi } from "../../api/client";

export const updateStatus = (status: StatusTypes) => async (dispatch: any) => {
  dispatch({
    type: ChatsActionTypes.UPDATE_STATUS,
    payload: status,
  });
};

export const fetchChats = (apiClient) => async (dispatch: any) => {};
