import { Api, LoginInfo } from "../../api/api";
import { navigate } from "vike/client/router";
import { UserActionTypes } from "./types";
import { StatusTypes } from "../types";

export async function updateStatus(status: StatusTypes, dispatch: any) {
  dispatch({
    type: UserActionTypes.UPDATE_STATUS_USER,
    payload: status,
  });
}

export async function logOutUser(api: typeof Api.prototype.api, dispatch: any) {
  await dispatch({
    type: UserActionTypes.UPDATE_USER,
    payload: {
      status: StatusTypes.EMPTY,
    },
  });
  await api.logoutRetrieve();
  navigate("/login");
}

export async function loginUsername(
  api: typeof Api.prototype.api,
  dispatch: any,
  pageContext: any,
  username: string,
  password: string
) {
  await updateStatus(StatusTypes.LOADING, dispatch);
  const LoginInfo: LoginInfo = {
    username: username,
    password: password,
  };
  try {
    const userData = await api.loginCreate(LoginInfo);
    await dispatch({
      type: UserActionTypes.UPDATE_USER,
      payload: { ...userData, status: StatusTypes.LOADED },
    });
    await updateStatus(StatusTypes.LOADED, dispatch);
    navigate("/chat");
  } catch (e) {
    const data = await e.json();
    await dispatch({
      type: UserActionTypes.UPDATE_USER,
      payload: {
        status: StatusTypes.ERROR,
        errors: data,
      },
    });
  }
}
