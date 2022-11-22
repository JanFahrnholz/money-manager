import { Props } from "next/script";
import { createContext, FC, useEffect, useState } from "react";
import { list } from "../lib/Transactions";
import { client } from "../lib/Pocketbase";
import Record from "../types/Record";
import Transaction from "../types/Transaction";
import { useRouter } from "next/router";

type ContextProps = {
    transactions: Record<Transaction>[];
};

export const TransactionContext = createContext<ContextProps>(undefined!);

const TransactionContextProvider: FC<Props> = (props) => {
    const [transactions, setTransactions] = useState<Record<Transaction>[]>([]);
    const [trigger, setTrigger] = useState(true);
    const router = useRouter();

    useEffect(() => {
        list()
            .then((res) => {
                setTransactions(res as Record<Transaction>[]);
            })
            .catch((err) => {});

        client.realtime
            .subscribe("transactions", (res) => setTrigger(!trigger))
            .catch((err) => router.reload());
    }, [trigger]);

    return (
        <TransactionContext.Provider
            value={{
                transactions,
            }}
        >
            {props.children}
        </TransactionContext.Provider>
    );
};

export default TransactionContextProvider;
