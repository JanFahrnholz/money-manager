import { useEffect, useState } from "react";
import { list } from "../lib/Transactions";
import ApiResponse from "../types/ApiResponse";
import Transaction from "../types/Transaction";
import useTrigger from "./useTrigger";

const useFetchTransactions = (filter?: string) => {
    const [data, setData] = useState<ApiResponse<Transaction> | undefined>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | undefined>();

    list(filter)
        .then((res) => setData(res))
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));

    return { data, loading, error };
};

export default useFetchTransactions;
