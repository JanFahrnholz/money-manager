import { Props } from "next/script";
import { createContext, FC, useContext, useEffect, useState } from "react";
import { list } from "../lib/Transactions";
import { client } from "../lib/Pocketbase";
import Record from "../types/Record";
import Transaction from "../types/Transaction";
import { useRouter } from "next/router";
import usePersistantState from "../hooks/usePersistantStorage";
import { NavigationContext } from "./NavigationContext";
import useTrigger from "../hooks/useTrigger";

type ContextProps = {
    transactions: Record<Transaction>[];
};

export const TransactionContext = createContext<ContextProps>(undefined!);

const TransactionContextProvider: FC<Props> = (props) => {
    const [transactions, setTransactions] = useState<Record<Transaction>[]>([]);
    const { currentTab } = useContext(NavigationContext);
    const [state, trigger] = useTrigger();
    const router = useRouter();

    useEffect(() => {
        list("planned=False")
            .then((res) => {
                setTransactions(res as Record<Transaction>[]);
            })
            .catch((err) => {});
        client.collection("transactions").subscribe("*", () => trigger());
    }, [state, currentTab == 0]);

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
