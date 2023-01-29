import Profile from "@/types/Profile";
import { client } from "lib/Pocketbase";
import { useContext } from "react";
import toast from "react-hot-toast";
import { ProfileContext } from "../context";

export default function useCreate() {
    const { setProfile } = useContext(ProfileContext);

    const create = async () => {
        const id = client.authStore.model?.id;
        if (!id) return;

        try {
            const profile = await client
                .collection("profiles")
                .create<Profile>({ user: id });
            setProfile(profile);
            toast.success("Profile created");
        } catch (error) {
            toast.error("Could not create profile");
        }
    };

    return create;
}
