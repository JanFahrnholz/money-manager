import Contact from "@/types/Contact";
import toast from "react-hot-toast";
import Record from "../types/Record";
import SortedTransactions from "../types/SortedTransactions";
import Transaction from "../types/Transaction";
import TransactionType from "../types/TransactionType";
import {
    modifyBalance as modifyContactBalance,
    update as updateContact,
} from "./Contacts";
import { client } from "./Pocketbase";
import {
    modifyBalance as modifyUserBalance,
    updateBalanceByTransaction,
} from "./User";
const _ = require("lodash");

type CreateProps = {
    amount: number;
    info?: string;
    planned?: boolean;
    contact: string;
    type: TransactionType;
};

const list = (filter = "", planned = false) => {
    return new Promise<Record<Transaction>[]>(async (resolve, reject) => {
        try {
            const res = await client
                .collection(planned ? "planned_transactions" : "transactions")
                .getFullList<Record<Transaction>>(20, {
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
            const res = await client
                .collection(planned ? "planned_transactions" : "transactions")
                .create({
                    amount,
                    type,
                    info,
                    contact,
                    date: new Date(),
                    owner: client.authStore.model?.id,
                });

            const contactEntry = await client
                .collection("contacts")
                .getOne(contact);

            if (type === "Rechnung" && !planned) {
                await updateContact(contact, {
                    balance: contactEntry.balance - amount,
                });
            }

            if (type === "Rückzahlung" && !planned) {
                await updateContact(contact, {
                    balance: contactEntry.balance + amount,
                });
            }

            if (type === "Einnahme" && !planned)
                await modifyUserBalance(amount);

            if (type === "Ausgabe" && !planned)
                await modifyUserBalance(-amount);

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

type UpdateProps = Omit<Transaction, "type">;

const update = (id: string, data: UpdateProps) => {
    const promise = new Promise(async (resolve, reject) => {
        try {
            const res = await client
                .collection("transactions")
                .update(id, data);

            updateBalanceByTransaction(id, data, "UPDATE");

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

const remove = (id: string, planned = false) => {
    const promise = new Promise<void>(async (resolve, reject) => {
        try {
            const transaction = (await client
                .collection(planned ? "planned_transactions" : "transactions")
                .getOne(id, {
                    expand: "contact",
                })) as Record<Transaction>;

            if (transaction.type == "Rechnung")
                await modifyContactBalance(
                    transaction.expand.contact.id,
                    transaction.amount
                );

            if (transaction.type == "Rückzahlung")
                await modifyContactBalance(
                    transaction.expand.contact.id,
                    -transaction.amount
                );

            updateBalanceByTransaction(id, null, "DELETE");
            await client
                .collection(planned ? "planned_transactions" : "transactions")
                .delete(id);
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

const confirm = async ({
    id,
    amount,
    info,
    contact,
    type,
}: Record<Transaction>) => {
    try {
        await create({ amount, info, contact, type, planned: false });
        await remove(id, true);
    } catch (error) {
        return error;
    }
};

const expandTransaction = async (transaction: Record<Transaction>) => {
    try {
        const contact = await client
            .collection("contacts")
            .getOne<Record<Contact>>(transaction.contact, {
                $cancelKey: "expandWithContact",
            });
        const owner = await client
            .collection("users")
            .getOne<Record<Contact>>(transaction.owner, {
                $cancelKey: "expandWithOwner",
            });

        transaction.expand = { contact, owner };

        return transaction;
    } catch (error) {
        return transaction;
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

export {
    list,
    sort,
    create,
    update,
    remove,
    confirm,
    expandTransaction,
    getColor,
};
