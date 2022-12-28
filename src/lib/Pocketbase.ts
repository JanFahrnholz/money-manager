import PocketBase from "pocketbase";
import ShortUniqueId from "short-unique-id";

const client = new PocketBase(process.env.PB_URL);
client.autoCancellation(false);

const register = (password: string, passwordConfirm: string) => {
	return new Promise<any>(async (resolve, reject) => {
		const id: string = new ShortUniqueId({ length: 15 })();

		try {
			await client.collection("users").create({
				id,
				username: id,
				password,
				passwordConfirm,
			});

			const res = await client
				.collection("users")
				.authWithPassword(id, password);

			resolve(res);
		} catch (error) {
			reject(error);
		}
	});
};

const login = (id: string, password: string) => {
	return new Promise(async (resolve, reject) => {
		try {
			const res = await client
				.collection("users")
				.authWithPassword(id, password);

			resolve(res);
		} catch (error) {
			reject(error);
		}
	});
};

const deleteId = async (id: string) => {
	try {
		if (id === undefined) return;

		await client.collection("users").delete(id);
	} catch (error) {}
};

export { client, register, login, deleteId };
