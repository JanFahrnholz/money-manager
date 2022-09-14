import {
    List,
    ListSubheader,
    ListItem,
    ListItemText,
    Avatar,
    Divider,
    ListItemAvatar,
    Typography,
} from "@mui/material";
import { FC, useContext, useEffect, useState, Fragment } from "react";
import { TransactionContext } from "../../../context/TransactionContext";

import Transaction from "../../../types/Transaction";
import TransactionListItem from "./item";

const TransactionList: FC = () => {
    const storage = useContext(TransactionContext);

    return (
        <div className="p-2">
            <List
                sx={{
                    width: "100%",
                    maxHeight: "80vh",
                    bgcolor: "background.paper",
                    position: "relative",
                    overflow: "auto",
                    "& ul": { padding: 0 },
                }}
                subheader={<li />}
            >
                {Object.values(storage.getSortedTransactions()).map((month) => (
                    <li key={`section-${month[0].date}`}>
                        <ul key={`ul-${month[0].date}`}>
                            <ListSubheader>{`${new Date(
                                month[0].date
                            ).toLocaleDateString("default", {
                                month: "long",
                            })}`}</ListSubheader>

                            {month.map((transaction: Transaction) => (
                                <TransactionListItem
                                    key={transaction.id}
                                    transaction={transaction}
                                />
                            ))}
                        </ul>
                    </li>
                ))}
            </List>
        </div>
    );
};

export default TransactionList;
