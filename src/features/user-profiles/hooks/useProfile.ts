import { client } from "lib/Pocketbase";
import { useContext } from "react";
import { ProfileContext } from "../context";

const useProfile = () => {
    const { profile } = useContext(ProfileContext);

    const get = async (id: string) => {
        return await client
            .collection("profiles")
            .getFirstListItem(`user.id="${id}"`);
    };

    return { profile, get };
};

export default useProfile;
