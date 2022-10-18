import { createContext, FC, useContext, useEffect } from "react";
import usePersistantState from "../hooks/usePersistantStorage";
import Transaction from "../types/Transaction";
const _ = require("lodash");
import TransactionStorage from "../lib/TransactionStorage";
import { Props } from "next/script";
import { UserContext } from "./UserContext";
import Backup from "../types/Backup";

export const TransactionContext = createContext<TransactionStorage>(undefined!);

const TransactionContextProvider: FC<Props> = (props) => {
    const { sync, getPreferences } = useContext(UserContext);

    const [transactions, setTransactions] = usePersistantState<Transaction[]>(
        "dc_transactions",
        []
    );

    useEffect(() => {
        const backup = async () => {
            getPreferences("syncTransactions").then((pref: Backup<boolean>) => {
                if (pref.data) sync("transactions", transactions);
            });
        };
        backup();
    }, [transactions]);

    const storage = new TransactionStorage(transactions, setTransactions);

    return (
        <TransactionContext.Provider value={storage}>
            {props.children}
        </TransactionContext.Provider>
    );
};

export default TransactionContextProvider;
