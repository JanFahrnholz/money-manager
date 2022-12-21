import Contact from "@/types/Contact";
import Record from "@/types/Record";
import { useEffect, useMemo, useState } from "react";
import useSelect from "./useSelect";

const useSortContacts = (contacts: Record<Contact>[], options: string[]) => {
    const initial = [...contacts];
    const select = useSelect(options);
    const [sortedContacts, setSortedContacts] = useState<Record<Contact>[]>([]);

    const sortBalance = () => {
        return [...contacts].sort((a, b) => {
            if (a.balance < b.balance) return -1;
            if (a.balance > b.balance) return 1;
            return 0;
        });
    };

    const sortUpdated = () => {
        return [...contacts].sort((a, b) => {
            return a.updated.valueOf() < b.updated.valueOf() ? 1 : -1;
        });
    };

    const sortName = () => {
        return [...contacts].sort((a, b) => {
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();
            return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
        });
    };

    useEffect(() => {
        if (select.value === "balance") setSortedContacts(sortBalance());
        if (select.value === "updated") setSortedContacts(sortUpdated());
        if (select.value === "name") setSortedContacts(sortName());
        if (select.value === "none") setSortedContacts(initial);
    }, [contacts, select.value]);

    return {
        contacts: sortedContacts,
        selected: select.value,
        select: select.select,
        options: select.options,
    };
};

export default useSortContacts;
