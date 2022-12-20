import { client } from "lib/Pocketbase";
import { useState } from "react";

const useUser = () => {
	const [user, setUser] = useState(client.authStore.model);

	client.authStore.onChange((auth) => {
		setUser(client.authStore.model);
	});

	return user;
};

export default useUser;
