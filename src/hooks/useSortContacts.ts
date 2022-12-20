import Contact from "@/types/Contact";
import Record from "@/types/Record";
import { useMemo } from "react";
import useSelect from "./useSelect";

const useSortContacts = (contacts: Record<Contact>[], options: string[]) => {
    const initial = [...contacts];
    const select = useSelect(options);

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

    const sortedContacts = useMemo(() => {
        if (select.value === "balance") return sortBalance();
        if (select.value === "updated") return sortUpdated();

        return initial;
    }, [contacts, select.value, initial]);

    return {
        contacts: sortedContacts,
        selected: select.value,
        select: select.select,
        options: select.options,
    };
};

export default useSortContacts;
