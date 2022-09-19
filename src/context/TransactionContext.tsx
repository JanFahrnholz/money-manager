import { createContext, FC } from "react";
import usePersistantState from "../hooks/usePersistantStorage";
import Transaction from "../types/Transaction";
const _ = require("lodash");
import TransactionStorage from "../lib/TransactionStorage";

export const TransactionContext = createContext<TransactionStorage>(undefined!);

const TransactionContextProvider: FC = (props) => {
    const [transactions, setTransactions] = usePersistantState<Transaction[]>(
        "dc_transactions",
        []
    );

    const storage = new TransactionStorage(transactions, setTransactions);

    return (
        <TransactionContext.Provider value={storage}>
            {props.children}
        </TransactionContext.Provider>
    );
};

export default TransactionContextProvider;