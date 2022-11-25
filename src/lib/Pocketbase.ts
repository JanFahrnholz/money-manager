import PocketBase from "pocketbase";
import ShortUniqueId from "short-unique-id";

const client = new PocketBase(process.env.PB_URL);

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
    if (id === undefined) return;

    const idReference = await client.collection("ids").getFullList(undefined, {
        user_id: id,
    });
    await client.collection("ids").delete(idReference[0].id);

    const transactions = await client
        .collection("transactions")
        .getFullList(undefined);
    transactions.map(async (transaction) => {
        await client.collection("transactions").delete(transaction.id);
    });

    const contacts = await client.collection("contacts").getFullList(undefined);
    contacts.map(async (contact) => {
        await client.collection("contacts").delete(contact.id);
    });

    await client.collection("users").delete(id);
};

export { client, register, login, deleteId };
