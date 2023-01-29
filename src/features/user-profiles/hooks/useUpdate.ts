import Profile from "@/types/Profile";
import { client } from "lib/Pocketbase";
import { useContext } from "react";
import { ProfileContext } from "../context";

const useUpdate = () => {
    const { profile, setProfile } = useContext(ProfileContext);

    const update = (params: Partial<Profile>) => {
        if (!profile?.id) return;
        client.collection("profiles").update(profile.id, params);
    };

    return update;
};

export default useUpdate;
