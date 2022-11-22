import { useRouter } from "next/router";
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
    const [trigger, setTrigger] = useState(true);
    const router = useRouter();

    useEffect(() => {
        list()
            .then((res) => {
                setContacts(res as Record<Contact>[]);
            })
            .catch((err) => {});

        client.realtime
            .subscribe("contacts", (res) => {
                list()
                    .then((res) => {
                        setContacts(res as Record<Contact>[]);
                    })
                    .catch((err) => {});
            })
            .catch((err) => router.reload());
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
