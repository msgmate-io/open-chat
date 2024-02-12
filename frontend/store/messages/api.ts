import { MessagesActionTypes } from "./types";
import { StatusTypes } from "../types";
import { Api } from "../../api/api";

export const updateStatus = (status: StatusTypes) => async (dispatch: any) => {
  dispatch({
    type: MessagesActionTypes.UPDATE_STATUS,
    payload: status,
  });
};

// api: typeof Api.prototype.api, dispath: any
export function sendMessage({ api, dispatch }) {}
