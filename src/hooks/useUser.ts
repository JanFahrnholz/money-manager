import User from "@/types/User";
import { client } from "lib/Pocketbase";
import { useEffect, useState } from "react";
import useTrigger from "./useTrigger";

const useUser = () => {
	const [user, setUser] = useState<User>();
	const [trigger, reload] = useTrigger();
	const id = client.authStore.model?.id;

	useEffect(() => {
		if (!id) return;
		fetchUser(id);

		return () => unsubscribe();
	}, [trigger]);

	const fetchUser = async (id: string) => {
		try {
			const user = await client
				.collection("users")
				.getOne<User>(id, { $cancelKey: "fetchUser" });

			setUser(user);
		} catch (error) {}
	};
	if (!id) return;

	client.collection("users").subscribe(id, () => fetchUser(id));

	const unsubscribe = () => {
		client
			.collection("users")
			.unsubscribe(id)
			.catch(() => {});
	};

	client.authStore.onChange((auth) => {
		reload();
	});

	return user;
};

export default useUser;
