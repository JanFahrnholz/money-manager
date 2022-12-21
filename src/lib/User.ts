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
		const contact = await client
			.collection("users")
			.getOne(id, { $cancelKey: "modifyUserBalance" });

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

const updateBalanceByTransaction = async (
	id: string,
	data: Partial<Transaction> | null,
	action: CrudAction
) => {
	try {
		const before = await client
			.collection("transactions")
			.getOne<TransactionRecord>(id);

		if (action === "CREATE") await updateBalanceOnCreate(before, data);
		// if (action === "UPDATE") await updateBalanceOnUpdate(before, data);
		if (action === "DELETE") await updateBalanceOnDelete(before);
	} catch (error) {}
};

const updateBalanceOnCreate = async (
	before: TransactionRecord,
	after: Partial<Transaction> | null
) => {
	if (!after) return;
	if (after.amount === undefined) return;
	const { type, planned } = before;
	const amountBefore = before.amount;
	const amountAfter = after.amount;

	if (planned) return;
	if (type === "Einnahme") await modifyBalance(amountAfter - amountBefore);
	if (type === "Ausgabe") await modifyBalance(-(amountAfter - amountBefore));
};

const updateBalanceOnUpdate = async (
	before: TransactionRecord,
	after: Partial<Transaction> | null
) => {
	if (!after) return;
	const { type, planned, amount } = before;

	// TODO Backend: split transactions --> transactions + planned_transaction

	/*if (planned === true && after.planned === true) return;

	if (planned === true && after.planned === false) {
		switch (type) {
			case "Ausgabe":
				await modifyBalance(-am);
			case "Einnahme":
				await modifyBalance();
			case "Rechnung":
				await modifyBalance();
			case "Rückzahlung":
				await modifyBalance();
		}
	}
	if (planned === false && after.planned === true) {
	}
	if (planned === false && after.planned === false) {
		await modifyBalance();
	} */
};

const updateBalanceOnDelete = async (before: TransactionRecord) => {
	const { type, planned, amount } = before;

	if (planned) return;
	if (type === "Einnahme") await modifyBalance(-amount);
	if (type === "Ausgabe") await modifyBalance(amount);
};

export { update, modifyBalance, updateBalanceByTransaction };
