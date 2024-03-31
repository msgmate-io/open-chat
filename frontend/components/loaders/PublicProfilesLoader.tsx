export default PublicProfilesLoader;

import { useApi } from "@/_api/client2";
import { fetchPublicProfiles } from "@/store/publicProfiles";
import { RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function PublicProfilesLoader() {
    const api = useApi();
    const dispatch = useDispatch();
    const publicProfiles = useSelector((state: RootState) => state.publicProfiles.value);
    useEffect(() => {
        if (!publicProfiles) {
            api.publicProfilesList({}).then((profiles) => {
                dispatch(fetchPublicProfiles(profiles));
            })
        }
    }, []);
    return null
}