import { Api, UserProfile } from "../../api/api";
import { StatusTypes } from "../types";

export interface ProfileState extends UserProfile {
  status: StatusTypes;
  errors: { [key: string]: string[] };
}

export enum ProfileActionTypes {
  UPDATE_STATUS_PROFILE = "UPDATE_STATUS_PROFILE",
  UPDATE_PROFILE = "UPDATE_PROFILE",
}

export interface ProfileStatusAction {
  type: ProfileActionTypes.UPDATE_STATUS_PROFILE;
  payload: StatusTypes;
}

export interface ProfileUpdateAction {
  type: ProfileActionTypes.UPDATE_PROFILE;
  payload: UserProfile;
}
