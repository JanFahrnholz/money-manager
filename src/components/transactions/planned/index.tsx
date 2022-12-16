import { List, ListItem, ListSubheader } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { list } from "../../../lib/Transactions";
import Record from "../../../types/Record";
import Transaction from "../../../types/Transaction";
import PlannedTransactionListItem from "./item";

const PlannedTransactions: FC = () => {
    const [transactions, setTransactions] = useState<Record<Transaction>[]>([]);

    useEffect(() => {
        list("planned=True")
            .then((res) => {
                setTransactions(res as Record<Transaction>[]);
            })
            .catch(() => {});
    }, []);

    return (
        <>
            <List
                sx={{
                    width: "100%",

                    bgcolor: "background.default",
                    position: "relative",
                    overflow: "auto",
                    p: 1,
                }}
            >
                <ListSubheader sx={{ borderRadius: "5px" }}>
                    Planned Transactions
                </ListSubheader>
                {transactions.map((transaction) => (
                    <PlannedTransactionListItem
                        key={transaction.id}
                        transaction={transaction}
                    />
                ))}
            </List>
        </>
    );
};

export default PlannedTransactions;
