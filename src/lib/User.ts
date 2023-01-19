import CrudAction from "@/types/CrudAction";
import Record from "@/types/Record";
import Transaction from "@/types/Transaction";
import TransactionRecord from "@/types/TransactionRecord";
import User from "@/types/User";
import toast from "react-hot-toast";
import { client } from "./Pocketbase";

const modifyBalance = async (modifier: number) => {
    const id = client.authStore.model?.id;
    if (!id) return;
    try {
        const contact = await client.collection("users").getOne(id);

        await update(id, { balance: contact.balance + modifier });
    } catch (error) {}
};

const update = async (id: string, data: Partial<User>) => {
    try {
        return await client.collection("users").update(id, data);
    } catch (error) {
        toast.error("could not update user");
    }
};

const updateBalanceOnCreate = async (transaction: TransactionRecord) => {
    const { amount, type } = transaction;

    if (type === "Einnahme") await modifyBalance(amount);
    if (type === "Rückzahlung") await modifyBalance(amount);
    if (type === "Ausgabe") await modifyBalance(-amount);
};

const updateBalanceOnDelete = async (transaction: TransactionRecord) => {
    const { type, amount } = transaction;

    if (type === "Einnahme") await modifyBalance(-amount);
    if (type === "Rückzahlung") await modifyBalance(-amount);
    if (type === "Ausgabe") await modifyBalance(amount);
};

export { update, modifyBalance, updateBalanceOnCreate, updateBalanceOnDelete };
