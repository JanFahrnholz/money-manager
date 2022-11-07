import { CircularProgress, List, ListSubheader } from "@mui/material";
import { FC, useContext, useEffect, useRef, useState } from "react";
import ViewportList from "react-viewport-list";
import { TransactionContext } from "../../../context/TransactionContext";
import Transaction from "../../../types/Transaction";
import TransactionListItem from "./item";

const TransactionList: FC = () => {
    const storage = useContext(TransactionContext);
    const [transactions, setTransactions] = useState<Transaction[][]>(
        Object.values(storage.getSortedTransactions())
    );

    useEffect(() => {
        const t = Object.values(storage.getSortedTransactions());
        setTransactions(t);
    }, [storage.transactions, storage]);

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
                <ViewportList items={transactions} itemMinSize={20}>
                    {(item) => (
                        <li key={`section-${item[0].date}`}>
                            <ul>
                                <ListSubheader sx={{ borderRadius: "5px" }}>
                                    {formatDate(item[0].date)}
                                </ListSubheader>

                                {item.map((transaction: Transaction) => (
                                    <TransactionListItem
                                        key={transaction.id}
                                        transaction={transaction}
                                    />
                                ))}
                            </ul>
                        </li>
                    )}
                </ViewportList>
            </List>
        </div>
    );
};

export default TransactionList;

// {transactions.map((month) => (
//     <li key={`section-${month[0].date}`}>
//         <ul>
//             <ListSubheader sx={{ borderRadius: "5px" }}>
//                 {formatDate(month[0].date)}
//             </ListSubheader>

//             {month.map((transaction: Transaction) => (
//                 <TransactionListItem
//                     key={transaction.id}
//                     transaction={transaction}
//                 />
//             ))}
//         </ul>
//     </li>
// ))}
