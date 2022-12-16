import { useRouter } from "next/router";
import { Props } from "next/script";
import { createContext, FC, useContext, useEffect, useState } from "react";
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
    const [state, trigger] = useTrigger();
    const { currentTab } = useContext(NavigationContext);
    const router = useRouter();

    useEffect(() => {
        list()
            .then((res) => {
                setContacts(res as Record<Contact>[]);
            })
            .catch((err) => {});

        if (currentTab === 1)
            client.collection("contacts").subscribe("*", (res) => {
                trigger();
            });

        if (currentTab !== 1) client.collection("contacts").unsubscribe("*");
    }, [state, currentTab == 1]);

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
