import { Alert, CircularProgress, List, ListSubheader } from "@mui/material";
import { FC, useContext, useEffect, useState } from "react";
import { TransactionContext } from "../../../context/TransactionContext";
import { client } from "../../../lib/Pocketbase";
import { list } from "../../../lib/Transactions";
import Record from "../../../types/Record";
import Transaction from "../../../types/Transaction";
import Error from "../../misc/Error";
import MustBeLoggedInAlert from "../../misc/MustBeLoggedInAlert";
import TransactionListItem from "./item";
const _ = require("lodash");

const TransactionList: FC = () => {
    const [error, setError] = useState();
    const { transactions } = useContext(TransactionContext);

    const formatDate = (date: Date) =>
        `${new Date(date).toLocaleDateString("default", {
            month: "long",
            year: "numeric",
        })}`;

    return (
        <div>
            <MustBeLoggedInAlert msg="Please login to use this functions" />

            <div className="px-2">
                <List
                    sx={{
                        width: "100%",
                        height: "80vh",
                        bgcolor: "background.default",
                        position: "relative",
                        overflow: "auto",
                        "& ul": { padding: 0 },
                    }}
                    subheader={<li />}
                >
                    {(transactions as any[]).map((month) => (
                        <li key={`section-${month[0].date}`}>
                            <ul>
                                <ListSubheader sx={{ borderRadius: "5px" }}>
                                    {formatDate(month[0].date)}
                                </ListSubheader>

                                {month.map(
                                    (transaction: Record<Transaction>) => (
                                        <TransactionListItem
                                            key={transaction.id}
                                            transaction={transaction}
                                        />
                                    )
                                )}
                            </ul>
                        </li>
                    ))}
                </List>
            </div>
        </div>
    );
};

export default TransactionList;
