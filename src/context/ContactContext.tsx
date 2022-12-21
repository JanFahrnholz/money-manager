import { Props } from "next/script";
import { createContext, FC, useEffect, useState } from "react";
import { list } from "../lib/Contacts";
import { client } from "../lib/Pocketbase";
import Contact from "../types/Contact";
import Record from "../types/Record";

type ContextProps = {
    contacts: Record<Contact>[];
};

export const ContactContext = createContext<ContextProps>(undefined!);

const ContactContextProvider: FC<Props> = (props) => {
    const [contacts, setContacts] = useState<Record<Contact>[]>([]);

    useEffect(() => {
        list()
            .then((res) => {
                setContacts(res);
            })
            .catch((err) => {});

        client
            .collection("contacts")
            .subscribe<Record<Contact>>("*", ({ action, record }) => {
                setContacts((prevRecords) => {
                    switch (action) {
                        case "create":
                            return [...prevRecords, record];
                        case "update":
                            return prevRecords.map((r) =>
                                r.id === record.id ? record : r
                            );
                        case "delete":
                            return prevRecords.filter(
                                (r) => r.id !== record.id
                            );
                        default:
                            return prevRecords;
                    }
                });
            })
            .catch(() => {});

        const unsubscribe = () => {
            client
                .collection("contacts")
                .unsubscribe("*")
                .catch(() => {});
        };

        return () => unsubscribe();
    }, []);

    return (
        <ContactContext.Provider
            value={{
                contacts,
            }}
        >
            {props.children}
        </ContactContext.Provider>
    );
};

export default ContactContextProvider;
