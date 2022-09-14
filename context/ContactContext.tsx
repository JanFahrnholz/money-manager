import { createContext, FC } from "react";
import usePersistantState from "../hooks/usePersistantStorage";
import Contact from "../types/Contact";
const _ = require("lodash");
import ContactStorage from "../lib/ContactStorage";

interface ContextType {
    storage: ContactStorage;
    reload: () => void;
}

export const ContactContext = createContext<ContextType>(undefined!);

const ContactContextProvider: FC = (props) => {
    const [contacts, setContacts] = usePersistantState<Contact[]>(
        "dc_contacts",
        []
    );

    const storage = new ContactStorage(contacts, setContacts);

    const reload = () => {
        const t = [...contacts];
        setContacts(t);
    };

    return (
        <ContactContext.Provider
            value={{
                storage,
                reload,
            }}
        >
            {props.children}
        </ContactContext.Provider>
    );
};

export default ContactContextProvider;
