import Contact from "@/types/Contact";
import TransactionRecord from "@/types/TransactionRecord";
import toast from "react-hot-toast";
import Record from "../types/Record";
import SortedTransactions from "../types/SortedTransactions";
import Transaction from "../types/Transaction";
import TransactionType from "../types/TransactionType";
import { updateContactOnCreate, updateContactOnDelete } from "./Contacts";
import { client } from "./Pocketbase";
import { transactionToast } from "./Toast";
import { updateBalanceOnCreate, updateBalanceOnDelete } from "./User";
const _ = require("lodash");

const list = (filter = "") => {
	return new Promise<TransactionRecord[]>(async (resolve, reject) => {
		try {
			const res = await client
				.collection("transactions")
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

const sort = (transactions: TransactionRecord[]) => {
	const t = _.groupBy(transactions, ({ date }: { date: Date }) =>
		new Date(date).getMonth()
	);

	return Object.values(t).reverse() as SortedTransactions;
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
				.collection("transactions")
				.create<TransactionRecord>({
					amount,
					type,
					info,
					contact,
					date: new Date(),
					owner: client.authStore.model?.id,
				});

			updateContactOnCreate(res);
			updateBalanceOnCreate(res);

			resolve(res);
		} catch (error) {
			reject(error);
		}
	});

	transactionToast(promise, "CREATE");

	return promise;
};

const remove = (transaction: TransactionRecord) => {
	const promise = new Promise<void>(async (resolve, reject) => {
		try {
			updateContactOnDelete(transaction);
			updateBalanceOnDelete(transaction);

			await client.collection("transactions").delete(transaction.id);
			resolve();
		} catch (error) {
			reject(error);
		}
	});

	transactionToast(promise, "DELETE");

	return promise;
};

const expandTransaction = async (transaction: Record<Transaction>) => {
	try {
		const contact = await client
			.collection("contacts")
			.getOne<Record<Contact>>(transaction.contact);
		const owner = await client
			.collection("users")
			.getOne<Record<Contact>>(transaction.owner);

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

export { list, sort, create, remove, expandTransaction, getColor };
