import Contact from "@/types/Contact";
import { Button } from "@mui/material";
import { NextRouter, useRouter } from "next/router";
import { Props } from "next/script";
import { createContext, FC, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useBoolean } from "usehooks-ts";
import useTrigger from "../hooks/useTrigger";
import { client } from "../lib/Pocketbase";
import { expandTransaction, list } from "../lib/Transactions";
import ApiResponse from "../types/ApiResponse";
import Record from "../types/Record";
import Transaction from "../types/Transaction";
import { NavigationContext } from "./NavigationContext";

type ContextProps = {
    transactions: Record<Transaction>[] | undefined;
    plannedTransactions: Record<Transaction>[] | undefined;
    loading: boolean;
};

export const TransactionContext = createContext<ContextProps>(undefined!);

const TransactionContextProvider: FC<Props> = (props) => {
    const [transactions, setTransactions] = useState<Record<Transaction>[]>([]);
    const [plannedTransactions, setPlannedTransactions] = useState<
        Record<Transaction>[]
    >([]);
    const [loading, setLoading] = useState(false);

    console.log(transactions, plannedTransactions);

    useEffect(() => {
        setLoading(true);
        const p1 = list().then((res) => {
            setTransactions(res);
        });

        const p2 = list("", true).then((res) => setPlannedTransactions(res));

        Promise.all([p1, p2])
            .catch(() => {})
            .finally(() => setLoading(false));

        subscribeTransactions("transactions", transactions, setTransactions);
        subscribeTransactions(
            "planned_transactions",
            plannedTransactions,
            setPlannedTransactions
        );

        return () => unsubscribeTransactions();
    }, []);

    return (
        <TransactionContext.Provider
            value={{
                transactions,
                plannedTransactions,
                loading,
            }}
        >
            {props.children}
        </TransactionContext.Provider>
    );
};

export default TransactionContextProvider;

const subscribeTransactions = (
    collection: string,
    transactions: Record<Transaction>[],
    setTransactions: (data: Record<Transaction>[]) => void
) => {
    try {
        client
            .collection(collection)
            .subscribe<Record<Transaction>>("*", ({ action, record }) =>
                updateTransactions(action, record, transactions).then((res) =>
                    setTransactions(res)
                )
            );
    } catch (error) {}
};

const unsubscribeTransactions = () => {
    client
        .collection("transactions")
        .unsubscribe("*")
        .catch(() => {});
};
const updateTransactions = async (
    action: string,
    record: Record<Transaction>,
    prevRecords: Record<Transaction>[]
) => {
    if (action === "delete")
        return prevRecords.filter((r) => r.id !== record.id);

    record = await expandTransaction(record);

    if (action === "create") return [record, ...prevRecords];
    if (action === "update")
        return prevRecords.map((r) => (r.id === record.id ? record : r));

    return prevRecords;
};

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
