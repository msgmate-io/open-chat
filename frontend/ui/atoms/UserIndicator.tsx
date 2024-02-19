export default UserIndicator;

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducer";
import { StatusTypes } from "../../store/types";
import UserDataLoader from "./UserDataLoader";

function UserIndicator() {
  const user = useSelector((state: RootState) => state.user);

  let text: string | null = null;

  if (user.status === StatusTypes.EMPTY) {
    text = "NO USER LOADED";
  } else if (user.status === StatusTypes.LOADING) {
    text = "LOADING USER";
  }

  return (
    <div
      className={`w-40 h-14 rounded-xl flex flex-col items-center content-center justify-center relative ${
        user.status === StatusTypes.LOADED ? "bg-success" : "bg-error"
      }`}
    >
      <UserDataLoader />
      {text}
      {user.status === StatusTypes.LOADED && (
        <div className="flex flex-col relative">
          <div className="text-xs">email: {user.email}</div>
          <div className="text-xs">uuid: {user.uuid}</div>
        </div>
      )}
      {user.status === StatusTypes.EMPTY && (
        <a href="/login" className="btn btn-outline btn-xs">
          Login
        </a>
      )}
    </div>
  );
}
