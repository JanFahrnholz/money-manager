import Record from "@/types/Record";
import { useState } from "react";
import { list } from "../lib/Transactions";
import Transaction from "../types/Transaction";

const useFetchTransactions = (filter?: string) => {
    const [data, setData] = useState<Record<Transaction>[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | undefined>();

    list(filter)
        .then((res) => setData(res))
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));

    return { data, loading, error };
};

export default useFetchTransactions;
