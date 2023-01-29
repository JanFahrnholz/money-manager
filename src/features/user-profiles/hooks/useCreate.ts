import Profile from "@/types/Profile";
import { client } from "lib/Pocketbase";
import { useContext } from "react";
import { ProfileContext } from "../context";

export default function useCreate() {
    const { setProfile } = useContext(ProfileContext);

    const create = async () => {
        const id = client.authStore.model?.id;
        if (!id) return;

        const profile = await client
            .collection("profiles")
            .create<Profile>({ user: id });
        setProfile(profile);
    };

    return create;
}
