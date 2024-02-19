import { StatusTypes } from "../types";
import { ProfileState } from "./types";
import {
  ProfileActionTypes,
  ProfileStatusAction,
  ProfileUpdateAction,
} from "./types";

const initialState: ProfileState = {
  status: StatusTypes.EMPTY,
  unsavedChanges: false,
  errors: {},
  last_updated: "",
  second_name: "",
  first_name: "",
};

type Action = ProfileStatusAction | ProfileUpdateAction;

export function profileReducer(
  state: ProfileState = initialState,
  action: Action
): ProfileState {
  switch (action.type) {
    case ProfileActionTypes.UPDATE_STATUS_PROFILE:
      return { ...state, status: action.payload };
    case ProfileActionTypes.UPDATE_PROFILE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
