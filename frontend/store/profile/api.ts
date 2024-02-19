import { Api } from "../../api/api";
import { StatusTypes } from "../types";
import { ProfileActionTypes } from "./types";
import { ProfileState } from "./types";

export async function maybeFetchProfile(
  dispatch: any,
  api: typeof Api.prototype.api,
  profile: ProfileState
) {
  if (profile.status === StatusTypes.EMPTY) {
    dispatch({
      type: ProfileActionTypes.UPDATE_STATUS_PROFILE,
      payload: StatusTypes.LOADING,
    });
    const profileFetched = await api.profileRetrieve();
    console.log("profileFetched", profileFetched);
    dispatch({
      type: ProfileActionTypes.UPDATE_PROFILE,
      payload: profileFetched,
    });
    dispatch({
      type: ProfileActionTypes.UPDATE_STATUS_PROFILE,
      payload: StatusTypes.LOADED,
    });
  }
}
