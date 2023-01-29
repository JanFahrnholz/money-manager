import Profile from "@/types/Profile";
import { profile } from "console";
import { client } from "lib/Pocketbase";
import { useContext } from "react";
import { ProfileContext } from "../context";

export default function useDelete() {
    const { setProfile, profile } = useContext(ProfileContext);

    const remove = async () => {
        if (!profile?.id) return;
        await client.collection("profiles").delete(profile?.id);
        setProfile(undefined);
    };

    return remove;
}
