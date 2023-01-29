import Profile from "@/types/Profile";
import { client } from "lib/Pocketbase";
import { useContext } from "react";
import { ProfileContext } from "../context";

const useUpdate = () => {
    const { profile, setProfile } = useContext(ProfileContext);

    const update = async (params: Partial<Profile>) => {
        if (!profile?.id) return;
        const p = await client
            .collection("profiles")
            .update<Profile>(profile.id, params);
        setProfile(p);
    };

    return update;
};

export default useUpdate;
