import { Button } from "@mui/material";
import { NextRouter } from "next/router";
import { Props } from "next/script";
import {
	createContext,
	Dispatch,
	FC,
	SetStateAction,
	useEffect,
	useState,
} from "react";
import { toast } from "react-hot-toast";
import { client } from "../lib/Pocketbase";
import { expandTransaction, list as listRegular } from "../lib/Transactions";
import { list as listPlanned } from "../lib/PlannedTransactions";
import Record from "../types/Record";
import Transaction from "../types/Transaction";

type ContextProps = {
	transactions: Record<Transaction>[] | undefined;
	plannedTransactions: Record<Transaction>[] | undefined;
	loading: boolean;
};

export const TransactionContext = createContext<ContextProps>(undefined!);

const TransactionContextProvider: FC<Props> = (props) => {
	const [transactions, setTransactions] = useState<Record<Transaction>[]>([]);
	const [planned, setPlanned] = useState<Record<Transaction>[]>([]);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		setLoading(true);

		const p1 = listRegular().then((res) => setTransactions(res));
		const p2 = listPlanned().then((res) => setPlanned(res));

		Promise.all([p1, p2]).finally(() => setLoading(false));

		client
			.collection("transactions")
			.subscribe<Record<Transaction>>("*", async ({ action, record }) => {
				record = await expandTransaction(record);

				setTransactions((prev) =>
					updateTransactions(action, record, prev)
				);
			});

		client
			.collection("planned_transactions")
			.subscribe<Record<Transaction>>("*", async ({ action, record }) => {
				record = await expandTransaction(record);

				setPlanned((prev) => updateTransactions(action, record, prev));
			});
		return () => unsubscribeTransactions();
	}, []);

	const updateTransactions = (
		action: string,
		record: Record<Transaction>,
		prevRecords: Record<Transaction>[]
	) => {
		if (action === "delete")
			return prevRecords.filter((r) => r.id !== record.id);

		if (action === "create") return [record, ...prevRecords];
		if (action === "update")
			return prevRecords.map((r) => (r.id === record.id ? record : r));

		return prevRecords;
	};

	const unsubscribeTransactions = () => {
		client
			.collection("transactions")
			.unsubscribe("*")
			.catch(() => {});

		client
			.collection("planned_transactions")
			.unsubscribe("*")
			.catch(() => {});
	};

	return (
		<TransactionContext.Provider
			value={{
				transactions,
				plannedTransactions: planned,
				loading,
			}}
		>
			{props.children}
		</TransactionContext.Provider>
	);
};

export default TransactionContextProvider;

const reloadToast = (router: NextRouter) => {
	toast(
		(t) => (
			<span>
				Failed to synchronize
				<Button
					variant="contained"
					onClick={() => {
						router.reload();
						toast.dismiss(t.id);
					}}
					sx={{ ml: 1 }}
					size="small"
				>
					reload
				</Button>
			</span>
		),
		{ duration: 4000 }
	);
};
