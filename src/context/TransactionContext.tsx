import Contact from "@/types/Contact";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { Props } from "next/script";
import { createContext, FC, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useBoolean } from "usehooks-ts";
import useTrigger from "../hooks/useTrigger";
import { client } from "../lib/Pocketbase";
import { list } from "../lib/Transactions";
import ApiResponse from "../types/ApiResponse";
import Record from "../types/Record";
import Transaction from "../types/Transaction";
import { NavigationContext } from "./NavigationContext";

type ContextProps = {
    transactions: Record<Transaction>[] | undefined;
    planned: Record<Transaction>[] | undefined;
    loading: boolean;
};

export const TransactionContext = createContext<ContextProps>(undefined!);

const TransactionContextProvider: FC<Props> = (props) => {
    const [transactions, setTransactions] = useState<Record<Transaction>[]>([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const updateTransactions = async (
        action: string,
        record: Record<Transaction>
    ) => {
        if (action !== "delete") record = await expandTransaction(record);

        setTransactions((prevRecords) => {
            if (action === "create") return [record, ...prevRecords];
            if (action === "update")
                return prevRecords.map((r) =>
                    r.id === record.id ? record : r
                );

            if (action === "delete")
                return prevRecords.filter((r) => r.id !== record.id);
            return prevRecords;
        });
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

    useEffect(() => {
        setLoading(true);
        list()
            .then((res) => {
                setTransactions(res);
            })
            .catch((err) => {})
            .finally(() => setLoading(false));

        client
            .collection("transactions")
            .subscribe<Record<Transaction>>("*", async ({ action, record }) =>
                updateTransactions(action, record)
            )
            .catch(() => {
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
            });

        const unsubscribe = () => {
            client
                .collection("transactions")
                .unsubscribe("*")
                .catch(() => {});
        };

        return () => unsubscribe();
    }, []);

    return (
        <TransactionContext.Provider
            value={{
                transactions: transactions.filter((t) => !t.planned),
                planned: transactions.filter((t) => t.planned),
                loading,
            }}
        >
            {props.children}
        </TransactionContext.Provider>
    );
};

export default TransactionContextProvider;
