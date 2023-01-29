import { client } from "lib/Pocketbase";
import { useContext } from "react";
import { ProfileContext } from "../context";

const useProfile = (userId?: string) => {
    const { profile } = useContext(ProfileContext);

    const getProfile = async (id: string) => {
        await client.collection("profiles").getOne(id);
    };

    if (!userId) return profile;

    return getProfile(userId);
};

export default useProfile;
