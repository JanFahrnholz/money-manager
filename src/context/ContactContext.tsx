import { useRouter } from "next/router";
import { Props } from "next/script";
import { createContext, FC, useContext, useEffect, useState } from "react";
import { useEffectOnce, useUpdateEffect } from "usehooks-ts";
import usePersistantState from "../hooks/usePersistantStorage";
import useTrigger from "../hooks/useTrigger";
import { list } from "../lib/Contacts";
import { client } from "../lib/Pocketbase";
import Contact from "../types/Contact";
import Record from "../types/Record";
import { NavigationContext } from "./NavigationContext";

type ContextProps = {
    contacts: Record<Contact>[];
};

export const ContactContext = createContext<ContextProps>(undefined!);

const ContactContextProvider: FC<Props> = (props) => {
    const [contacts, setContacts] = useState<Record<Contact>[]>([]);
    const [trigger, reload] = useTrigger();
    const { currentTab } = useContext(NavigationContext);
    console.log(contacts);

    useEffectOnce(() => {
        list()
            .then((res) => {
                setContacts(res);
            })
            .catch((err) => {});
    });

    useUpdateEffect(() => {
        if (currentTab === 1)
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
                });

        if (currentTab !== 1) client.collection("contacts").unsubscribe("*");
    }, [trigger, currentTab == 1]);

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
