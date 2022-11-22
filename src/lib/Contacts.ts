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

const list = (): Promise<Record<Contact>[]> => {
    return new Promise((resolve, reject) => {
        client.records
            .getFullList("contacts")
            .then((res: unknown) => {
                resolve(res as Record<Contact>[]);
            })
            .catch((err) => reject(err));
    });
};

const create = ({ name, balance, user }: CreateProps) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await client.records.create("contacts", {
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
            const res = await client.records.update("contacts", id, data);
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });
};

const modifyBalance = async (id: string, modifier: number) => {
    return new Promise(async (resolve, reject) => {
        try {
            const contact = await client.records.getOne("contacts", id);

            await update(id, { balance: contact.balance + modifier });
        } catch (error) {
            reject(error);
        }
    });
};

const remove = (id: string) => {
    return new Promise((resolve, reject) => {
        client.records
            .delete("contacts", id)
            .then((res) => resolve(res))
            .catch((err) => reject(err));
    });
};

const getInitials = (name: string) => {
    let names = name.split(" "),
        initials = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {
        initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
};

export { list, create, update, remove, modifyBalance, getInitials };
