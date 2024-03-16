export default UserLoader;

import { useApi } from "@/_api/client2";
import { fetchUser } from "@/store/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function UserLoader() {
    const api = useApi();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);
    useEffect(() => {
        if (!user) {
            api.userRetrieve().then((user) => {
                dispatch(fetchUser(user));
            })
        }
    }, []);
    return null
}