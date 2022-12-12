import { Balance } from "@mui/icons-material";
import Contact from "../types/Contact";
import Record from "../types/Record";
import SortedTransactions from "../types/SortedTransactions";
import Transaction from "../types/Transaction";
import TransactionType from "../types/TransactionType";
import { modifyBalance, update as updateContact } from "./Contacts";
import { client } from "./Pocketbase";
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

const list = (filter?: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await client
                .collection("transactions")
                .getList(1, 100, {
                    sort: "-created",
                    filter,
                    expand: "contact,owner",
                });
            resolve(res.items);
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
    return new Promise(async (resolve, reject) => {
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

            if (type == "Rechnung") {
                await updateContact(contact, {
                    balance: contactEntry.balance - amount,
                });
            }

            if (type == "Rückzahlung") {
                await updateContact(contact, {
                    balance: contactEntry.balance + amount,
                });
            }

            resolve(res);
        } catch (error) {
            reject(error);
        }
    });
};

const update = (id: string, data: UpdateProps) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await client
                .collection("transactions")
                .update(id, data);
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });
};

const remove = (id: string) => {
    return new Promise(async (resolve, reject) => {
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
        } catch (error) {
            reject(error);
        }
    });
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

export { list, sort, create, update, remove, getColor };
