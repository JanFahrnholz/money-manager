import { useEffect, useState } from "react";
import { client } from "../lib/Pocketbase";

export default function useLoggedIn() {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        setLoggedIn(client.authStore.isValid);
    }, []);

    client.authStore.onChange(() => {
        setLoggedIn(client.authStore.isValid);
    });

    return loggedIn;
}
