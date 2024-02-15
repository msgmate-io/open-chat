export default UserIndicator;

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducer";
import { StatusTypes } from "../../store/types";

function UserIndicator() {
  const user = useSelector((state: RootState) => state.user);

  let text = "";

  if (user.status === StatusTypes.EMPTY) {
    text = "NO USER LOADED";
  }

  return (
    <div className="w-40 h-14 bg-error rounded-xl flex flex-col items-center content-center justify-center">
      {text}
      {user.status === StatusTypes.EMPTY && (
        <a href="/login" className="btn btn-outline btn-xs">
          Login
        </a>
      )}
    </div>
  );
}
