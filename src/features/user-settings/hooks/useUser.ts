import User from "@/types/User";
import { client } from "lib/Pocketbase";
import { useState } from "react";

const useUser = () => {
    const [user, setUser] = useState(client.authStore.model);

    const update = async (params: Partial<User>) => {
        if (!user?.id) return;
        await client.collection("users").update(user.id, params);
        await client.collection("users").authRefresh();
    };

    client.authStore.onChange((toke, model) => setUser(model));

    return { update, user };
};

export default useUser;
