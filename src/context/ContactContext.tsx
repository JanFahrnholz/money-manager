import { createContext, FC } from "react";
import usePersistantState from "../hooks/usePersistantStorage";
import Contact from "../types/Contact";
const _ = require("lodash");
import ContactStorage from "../lib/ContactStorage";

export const ContactContext = createContext<ContactStorage>(undefined!);

const ContactContextProvider: FC = (props) => {
    const [contacts, setContacts] = usePersistantState<Contact[]>(
        "dc_contacts",
        []
    );

    const storage = new ContactStorage(contacts, setContacts);

    return (
        <ContactContext.Provider value={storage}>
            {props.children}
        </ContactContext.Provider>
    );
};

export default ContactContextProvider;