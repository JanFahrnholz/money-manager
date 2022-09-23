import { Props } from "next/script";
import { createContext, FC, useContext, useEffect, useState } from "react";
import usePersistantState from "../hooks/usePersistantStorage";
import StatsCalculator from "../lib/ProfileStorage";
import { ContactContext } from "./ContactContext";
import { TransactionContext } from "./TransactionContext";
const _ = require("lodash");

interface ContextType {
    stats: StatsCalculator;
}

export const ProfileContext = createContext<ContextType>(undefined!);

const ProfileContextProvider: FC<Props> = (props) => {
    const [vault, setVault] = usePersistantState("dc_vault", 0);
    const [balance, setBalance] = usePersistantState("dc_balance", 0);
    const transactions = useContext(TransactionContext);
    const contacts = useContext(ContactContext);

    const stats = new StatsCalculator(transactions, contacts);

    useEffect(() => {
        stats.calculate();
    }, [transactions.transactions, contacts.contacts]);

    return (
        <ProfileContext.Provider
            value={{
                stats,
            }}
        >
            {props.children}
        </ProfileContext.Provider>
    );
};

export default ProfileContextProvider;
