import { createContext, FC, useContext, useEffect } from "react";
import usePersistantState from "../hooks/usePersistantStorage";
import Contact from "../types/Contact";
const _ = require("lodash");
import ContactStorage from "../lib/ContactStorage";
import { Props } from "next/script";
import { UserContext } from "./UserContext";
import Backup from "../types/Backup";

export const ContactContext = createContext<ContactStorage>(undefined!);

const ContactContextProvider: FC<Props> = (props) => {
    const { sync, getPreferences } = useContext(UserContext);

    const [contacts, setContacts] = usePersistantState<Contact[]>(
        "dc_contacts",
        []
    );

    useEffect(() => {
        const backup = async () => {
            getPreferences("syncContacts").then((pref: Backup<boolean>) => {
                if (pref.data) sync("contacts", contacts);
            });
        };
        backup();
    }, [contacts]);

    const storage = new ContactStorage(contacts, setContacts);

    return (
        <ContactContext.Provider value={storage}>
            {props.children}
        </ContactContext.Provider>
    );
};

export default ContactContextProvider;
