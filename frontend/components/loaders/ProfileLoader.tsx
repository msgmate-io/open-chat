export default ProfileLoader;

import { useApi } from "@/_api/client2";
import { fetchProfile } from "@/store/profile";
import { RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function ProfileLoader() {
    const api = useApi();
    const dispatch = useDispatch();
    const profile = useSelector((state: RootState) => state.profile.value);
    useEffect(() => {
        if (!profile) {
            api.profileRetrieve().then((profile) => {
                dispatch(fetchProfile(profile));
            })
        }
    }, []);
    return null
}