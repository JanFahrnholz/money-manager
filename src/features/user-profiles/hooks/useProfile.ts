import Profile from "@/types/Profile";
import { client } from "lib/Pocketbase";
import { useContext, useEffect } from "react";
import { ProfileContext } from "../context";

const useProfile = () => {
    const { profile } = useContext(ProfileContext);

    const get = async (id: string) => {
        try {
            return await client
                .collection("profiles")
                .getFirstListItem<Profile>(`user.id="${id}"`);
        } catch (error: any) {
            throw new Error(error.message);
        }
    };

    return { profile, get };
};

export default useProfile;
