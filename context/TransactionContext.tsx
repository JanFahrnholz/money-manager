import { createContext, FC } from "react";
import usePersistantState from "../hooks/usePersistantStorage";
import Transaction from "../types/Transaction";
const _ = require("lodash");
import TransactionStorage from "../lib/TransactionStorage";

interface ContextType {
    storage: TransactionStorage;
    reload: () => void;
}

export const TransactionContext = createContext<ContextType>(undefined!);

const TransactionContextProvider: FC = (props) => {
    const [transactions, setTransactions] = usePersistantState<Transaction[]>(
        "dc_transactions",
        []
    );

    const storage = new TransactionStorage(transactions, setTransactions);

    const reload = () => {
        const t = [...transactions];

        setTransactions(t);
    };

    return (
        <TransactionContext.Provider
            value={{
                storage,
                reload,
            }}
        >
            {props.children}
        </TransactionContext.Provider>
    );
};

export default TransactionContextProvider;
