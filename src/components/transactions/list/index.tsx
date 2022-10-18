import { List, ListSubheader } from "@mui/material";
import { FC, useContext } from "react";
import { TransactionContext } from "../../../context/TransactionContext";
import Transaction from "../../../types/Transaction";
import TransactionListItem from "./item";

const TransactionList: FC = () => {
    const storage = useContext(TransactionContext);

    const transactions = Object.values(storage.getSortedTransactions());

    const formatDate = (date: Date) =>
        `${new Date(date).toLocaleDateString("default", {
            month: "long",
            year: "numeric",
        })}`;

    return (
        <div className="p-2">
            <List
                sx={{
                    width: "100%",
                    maxHeight: "80vh",
                    bgcolor: "background.default",
                    position: "relative",
                    overflow: "auto",
                    "& ul": { padding: 0 },
                }}
                subheader={<li />}
            >
                {transactions.map((month) => (
                    <li key={`section-${month[0].date}`}>
                        <ul>
                            <ListSubheader sx={{ borderRadius: "5px" }}>
                                {formatDate(month[0].date)}
                            </ListSubheader>

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
