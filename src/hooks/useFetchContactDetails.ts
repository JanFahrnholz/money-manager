import { useEffect, useState } from "react";
import { client } from "../lib/Pocketbase";
import { getCashflow } from "../lib/Statistics";
import ApiResponse from "../types/ApiResponse";
import Contact from "../types/Contact";
import Record from "../types/Record";
import Transaction from "../types/Transaction";
import TransactionRecord from "../types/TransactionRecord";

type ContactDetails = {
    contact: Record<Contact>;
    cashflow: number;
    transactions: TransactionRecord[];
};

const useFetchContactDetails = (id: string | undefined) => {
    const [data, setData] = useState<ContactDetails | undefined>();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        const details: Partial<ContactDetails> = {};

        const contacts = client
            .collection("contacts")
            .getOne(id, { expand: "owner" })
            .then((res: unknown) => {
                details.contact = res as Record<Contact>;
            })
            .catch((err) => setError(err.message));

        const transactions = client
            .collection("transactions")
            .getFullList(20, {
                filter: `contact="${id}"`,
                sort: "-date",
            })
            .then((res) => {
                const { items } = res as ApiResponse<Transaction>;
                console.log("fetch", res);
                details.transactions = items;
                details.cashflow = getCashflow(details.transactions || []);
            })
            .catch((err) => setError(err.message));

        Promise.all([transactions, contacts]).finally(() => {
            setLoading(false);
            setData(details as ContactDetails);
        });
    }, [id]);

    return { data, loading, error };
};

export default useFetchContactDetails;
