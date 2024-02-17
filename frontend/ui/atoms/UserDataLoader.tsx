export default UserDataLoader;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/reducer";
import { useApi } from "../../pages/api/client";
import { StatusTypes } from "../../store/types";

function UserDataLoader({ children }) {
  const dispatch = useDispatch();
  const pageContext = useSelector((state: RootState) => state.pageContext);
  const user = useSelector((state: RootState) => state.user);
  const api = useApi();

  useEffect(() => {
    if (user.status === StatusTypes.EMPTY) {
      api.userRetrieve().then((userData) => {
        dispatch({
          type: "UPDATE_USER",
          payload: { ...userData, status: StatusTypes.LOADED },
        });
      });
    }
  }, []);

  return <></>;
}
