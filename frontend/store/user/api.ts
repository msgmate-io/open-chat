import { Api, LoginInfo } from "../../api/api";
import { navigate } from "vike/client/router";
import { UserActionTypes } from "./types";

export async function loginUsername(
  api: typeof Api.prototype.api,
  dispatch: any,
  pageContext: any,
  username: string,
  password: string
) {
  const LoginInfo: LoginInfo = {
    username: username,
    password: password,
  };
  const userData = await api.loginCreate(LoginInfo);
  await dispatch({
    type: UserActionTypes.UPDATE_USER,
    payload: userData,
  });
  let navigateTo = pageContext?.urlPathname || "/";
  if (navigateTo === "/login" || navigateTo === "/register") {
    navigateTo = "/chat";
  }
  navigate(navigateTo);
}
