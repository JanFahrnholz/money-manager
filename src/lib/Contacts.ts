import Contact from "../types/Contact";
import Record from "../types/Record";
import { client } from "./Pocketbase";

type CreateProps = {
    name: string;
    balance: number;
    user: string;
};

type UpdateProps = {
    name?: string;
    balance?: number;
    user?: string;
};

const list = async (): Promise<Record<Contact>[]> => {
    try {
        const id = client.authStore.model?.id;
        const contacts = (await client
            .collection("contacts")
            .getFullList(undefined, {
                sort: "-user",
                expand: "owner",
            })) as Record<Contact>[];

        contacts.sort((a, b) => {
            return a.owner != id ? -1 : b.owner != id ? 1 : 0;
        });

        return contacts;
    } catch (error) {
        return [];
    }
};

const create = ({ name, balance, user }: CreateProps) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await client.collection("contacts").create({
                name,
                balance,
                user,
                owner: client.authStore.model?.id,
            });
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });
};

const update = (id: string, data: UpdateProps) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await client.collection("contacts").update(id, data);
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });
};

const modifyBalance = async (id: string, modifier: number) => {
    return new Promise(async (resolve, reject) => {
        try {
            const contact = await client.collection("contacts").getOne(id);

            await update(id, { balance: contact.balance + modifier });
        } catch (error) {
            reject(error);
        }
    });
};

const remove = (id: string) => {
    return new Promise((resolve, reject) => {
        client
            .collection("contacts")
            .delete(id)
            .then((res) => resolve(res))
            .catch((err) => reject(err));
    });
};

const isOwner = async (id: string) => {
    try {
        const contact = await client
            .collection("contacts")
            .getOne<Record<Contact>>(id);
        return contact.owner == id;
    } catch (error) {}
};
const isUser = async (id: string) => {};

const getInitials = (name: string) => {
    let names = name.split(" "),
        initials = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {
        initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
};

export { list, create, update, remove, modifyBalance, getInitials };
