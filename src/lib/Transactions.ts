import Record from "../types/Record";
import SortedTransactions from "../types/SortedTransactions";
import Transaction from "../types/Transaction";
import TransactionType from "../types/TransactionType";
import { modifyBalance, update as updateContact } from "./Contacts";
import { client } from "./Pocketbase";
import toast from "react-hot-toast";
import TransactionRecord from "../types/TransactionRecord";
import ApiResponse from "../types/ApiResponse";
import { ListResult } from "pocketbase";
const _ = require("lodash");

type CreateProps = {
    amount: number;
    info?: string;
    planned?: boolean;
    contact: string;
    type: TransactionType;
};

type UpdateProps = {
    amount?: number;
    info?: string;
    planned?: boolean;
    date?: Date;
};

const list = (filter = "") => {
    return new Promise<ApiResponse<Transaction>>(async (resolve, reject) => {
        try {
            const res = await client
                .collection("transactions")
                .getList(1, 100, {
                    sort: "-date",
                    filter,
                    expand: "contact,owner",
                });
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });
};

const sort = (transactions: Record<Transaction>[]) => {
    const t = _.groupBy(transactions, ({ date }: { date: Date }) =>
        new Date(date).getMonth()
    );

    return Object.values(t).reverse() as SortedTransactions;
};

const create = ({ amount, info, contact, type, planned }: CreateProps) => {
    const promise = new Promise(async (resolve, reject) => {
        try {
            const res = await client.collection("transactions").create({
                amount,
                type,
                info,
                planned,
                contact,
                date: new Date(),
                owner: client.authStore.model?.id,
            });

            const contactEntry = await client
                .collection("contacts")
                .getOne(contact);

            if (type == "Rechnung" && !planned) {
                await updateContact(contact, {
                    balance: contactEntry.balance - amount,
                });
            }

            if (type == "Rückzahlung" && !planned) {
                await updateContact(contact, {
                    balance: contactEntry.balance + amount,
                });
            }

            resolve(res);
        } catch (error) {
            reject(error);
        }
    });

    toast.promise(promise, {
        loading: "creating...",
        success: () => "Transaction successfully created",
        error: (err) => `Error: ${err.message}`,
    });

    return promise;
};

const update = (id: string, data: UpdateProps) => {
    const promise = new Promise(async (resolve, reject) => {
        try {
            const res = await client
                .collection("transactions")
                .update(id, data);
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });

    toast.promise(promise, {
        loading: "updating...",
        success: () => "Transaction successfully updated",
        error: (err) => `Error: ${err.message}`,
    });

    return promise;
};

const remove = (id: string) => {
    const promise = new Promise<void>(async (resolve, reject) => {
        try {
            const transaction = (await client
                .collection("transactions")
                .getOne(id, {
                    expand: "contact",
                })) as Record<Transaction>;

            if (transaction.type == "Rechnung")
                await modifyBalance(
                    transaction.expand.contact.id,
                    transaction.amount
                );

            if (transaction.type == "Rückzahlung")
                await modifyBalance(
                    transaction.expand.contact.id,
                    -transaction.amount
                );

            await client.collection("transactions").delete(id);
            resolve();
        } catch (error) {
            reject(error);
        }
    });

    toast.promise(promise, {
        loading: "deleting...",
        success: () => "Transaction successfully deleted",
        error: (err) => `Error: ${err.message}`,
    });

    return promise;
};

const confirm = async (transaction: Record<Transaction>) => {
    try {
        await update(transaction.id, { planned: false });

        if (transaction.type == "Rechnung")
            await modifyBalance(
                transaction.expand.contact.id,
                -transaction.amount
            );

        if (transaction.type == "Rückzahlung")
            await modifyBalance(
                transaction.expand.contact.id,
                transaction.amount
            );
    } catch (error) {
        return error;
    }
};

const cancel = async (transaction: Record<Transaction>) => {
    try {
        await remove(transaction.id);
    } catch (error) {
        return error;
    }
};

const getColor = (type: string) => {
    switch (type) {
        case "Einnahme":
            return "#62D836";
        case "Rückzahlung":
            return "#62D836";

        case "Ausgabe":
            return "#ff1c1c";
        case "Rechnung":
            return "#ff1c1c";

        default:
            return "#ffd600";
    }
};

export { list, sort, create, update, remove, confirm, cancel, getColor };
