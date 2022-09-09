import { createContext, FC, useContext, useEffect, useState } from "react";
import usePersistantState from "../hooks/usePersistantStorage";
import { ContactContext } from "./ContactContext";
import { TransactionContext } from "./TransactionContext";
const _ = require("lodash");

interface ContextType {
    profile: Object;
}

export const ProfileContext = createContext<ContextType>(undefined!);

const ProfileContextProvider: FC = (props) => {
    const [profile, setProfile] = usePersistantState("dc_profile", {});
    const transactions = useContext(TransactionContext);
    const contacts = useContext(ContactContext);

    useEffect(() => {
        let balance = 0;
        let pending = 0;

        transactions.storage.transactions.map((t) => {
            balance += t.amount;
        });

        contacts.storage.contacts.map((c) => {
            c.balance > 0 ? (pending += c.balance) : "";
        });

        setProfile({ balance, pending });
    }, [transactions.storage.transactions, contacts.storage.contacts]);

    return (
        <ProfileContext.Provider
            value={{
                profile,
            }}
        >
            {props.children}
        </ProfileContext.Provider>
    );
};

export default ProfileContextProvider;
