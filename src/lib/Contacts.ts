import Contact from "../types/Contact";
import Record from "../types/Record";
import { client } from "./Pocketbase";
import toast from "react-hot-toast";
import TransactionRecord from "@/types/TransactionRecord";

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
    const promise = new Promise(async (resolve, reject) => {
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

    toast.promise(promise, {
        loading: "creating...",
        success: () => "Contact successfully created",
        error: (err) => `Error: ${err.message}`,
    });

    return promise;
};

const update = (id: string, data: UpdateProps) => {
    const promise = new Promise(async (resolve, reject) => {
        try {
            const res = await client.collection("contacts").update(id, data);
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });

    toast.promise(promise, {
        loading: "updating...",
        success: () => "Contact successfully updated",
        error: (err) => `Error: ${err.message}`,
    });

    return promise;
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
    const promise = new Promise((resolve, reject) => {
        client
            .collection("contacts")
            .delete(id)
            .then((res) => resolve(res))
            .catch((err) => reject(err));
    });

    toast.promise(promise, {
        loading: "deleting...",
        success: () => "Contact successfully deleted",
        error: (err) => `Error: ${err.message}`,
    });

    return promise;
};

const isOwner = async (id: string) => {
    try {
        const contact = await client
            .collection("contacts")
            .getOne<Record<Contact>>(id);
        return contact.owner == id;
    } catch (error) {}
};

const getInitials = (name: string) => {
    let names = name.split(" "),
        initials = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {
        initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
};

const updateContactOnCreate = async (transaction: TransactionRecord) => {
    const { amount, type, contact } = transaction;

    type === "Rechnung" && (await modifyBalance(contact, -amount));
    type === "Rückzahlung" && (await modifyBalance(contact, amount));
};

const updateContactOnDelete = async (transaction: TransactionRecord) => {
    const { amount, type, contact } = transaction;

    type === "Rechnung" && (await modifyBalance(contact, amount));
    type === "Rückzahlung" && (await modifyBalance(contact, -amount));
};

export {
    list,
    create,
    update,
    remove,
    modifyBalance,
    getInitials,
    updateContactOnCreate,
    updateContactOnDelete,
};
