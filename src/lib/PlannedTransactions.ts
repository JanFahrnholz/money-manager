import Transaction from "@/types/Transaction";
import Record from "@/types/Record";
import toast from "react-hot-toast";
import { create as createRegularTransaction } from "./Transactions";
import { client } from "./Pocketbase";

import TransactionRecord from "@/types/TransactionRecord";

const list = (filter = "") => {
	return new Promise<TransactionRecord[]>(async (resolve, reject) => {
		try {
			const res = await client
				.collection("planned_transactions")
				.getFullList<TransactionRecord>(20, {
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
const create = ({
	amount,
	info,
	contact,
	type,
}: Pick<Transaction, "amount" | "info" | "type" | "contact">) => {
	const promise = new Promise(async (resolve, reject) => {
		try {
			const res = await client
				.collection("planned_transactions")
				.create<Record<Transaction>>({
					amount,
					type,
					info,
					contact,
					date: new Date(),
					owner: client.authStore.model?.id,
				});
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

const remove = (transaction: TransactionRecord) => {
	const promise = new Promise<void>(async (resolve, reject) => {
		try {
			await client
				.collection("planned_transactions")
				.delete(transaction.id);
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
		await createRegularTransaction(transaction);
		await remove(transaction);
	} catch (error) {
		return error;
	}
};

export { list, create, remove, confirm };
