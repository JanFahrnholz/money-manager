import { Props } from "next/script";
import { createContext, FC, useContext, useEffect, useState } from "react";
import useTrigger from "../hooks/useTrigger";
import { client } from "../lib/Pocketbase";
import { list } from "../lib/Transactions";
import ApiResponse from "../types/ApiResponse";
import Record from "../types/Record";
import Transaction from "../types/Transaction";
import { NavigationContext } from "./NavigationContext";

type ContextProps = {
    transactions: Record<Transaction>[] | undefined;
    res: ApiResponse<Transaction> | undefined;
    reload: () => void;
};

export const TransactionContext = createContext<ContextProps>(undefined!);

const TransactionContextProvider: FC<Props> = (props) => {
    const [response, setResponse] = useState<ApiResponse<Transaction>>();
    const { currentTab } = useContext(NavigationContext);
    const [state, reload] = useTrigger();

    useEffect(() => {
        list()
            .then((res) => {
                setResponse(res);
            })
            .catch((err) => {});

        if (currentTab === 0) {
        }
        client.collection("transactions").subscribe("*", () => reload());

        if (currentTab !== 0)
            client.collection("transactions").unsubscribe("*");
    }, [state, currentTab == 0]);

    return (
        <TransactionContext.Provider
            value={{
                transactions: response?.items.filter((t) => !t.planned),
                res: response,
                reload,
            }}
        >
            {props.children}
        </TransactionContext.Provider>
    );
};

export default TransactionContextProvider;
