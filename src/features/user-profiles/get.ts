import Profile from "@/types/Profile";
import useUser from "hooks/useUser";
import { client } from "lib/Pocketbase";

export default async function get() {
    const id = client.authStore.model?.id;
    if (!id) return;

    try {
        return await client
            .collection("profiles")
            .getFirstListItem<Profile>(`user.id="${id}"`);
    } catch (error) {}
}
