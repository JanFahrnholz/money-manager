import Profile from "@/types/Profile";
import { client } from "lib/Pocketbase";
import { useContext } from "react";
import { ProfileContext } from "../context";

const useProfile = (id?: string | undefined | null): Profile | undefined => {
    const { profile, profiles, setProfiles } = useContext(ProfileContext);
    if (id === null) return;
    if (id === undefined) return profile;

    if (profiles !== undefined) {
        if (profiles.has(id)) return profiles.get(id);
    }

    const addProfile = (key: string, value: Profile) => {
        const newProfiles = new Map(profiles);
        newProfiles.set(key, value);
        setProfiles(newProfiles);
    };

    client
        .collection("profiles")
        .getFirstListItem<Profile>(`user.id="${id}"`)
        .then((profile) => addProfile(id, profile))
        .catch(() => {});
};

export default useProfile;
