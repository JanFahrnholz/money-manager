import {
    Alert,
    CircularProgress,
    Divider,
    List,
    ListSubheader,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { FC, useContext, useEffect, useState } from "react";
import { TransactionContext } from "../../../context/TransactionContext";
import { list, sort } from "../../../lib/Transactions";
import Record from "../../../types/Record";
import SortedTransactions from "../../../types/SortedTransactions";
import Transaction from "../../../types/Transaction";
import TransactionListItem from "./item";

const TransactionList: FC = () => {
    const [error, setError] = useState();
    const { transactions } = useContext(TransactionContext);
    const [sorted, setSorted] = useState<SortedTransactions | null>(null);

    useEffect(() => {
        setSorted(sort(transactions));
    }, [transactions]);

    if (!sorted) return loadingState();

    return (
        <div>
            <div className="px-2">
                <List
                    sx={{
                        width: "100%",
                        height: "calc(100vh - 13rem)",
                        bgcolor: "background.default",
                        position: "relative",
                        overflow: "auto",
                        "& ul": { padding: 0 },
                    }}
                    subheader={<li />}
                >
                    {sorted.map((month) => (
                        <li key={`section-${month[0].date}`}>
                            {renderSubheader(month[0].date)}
                            <ul>
                                {month.map((transaction, i, arr) =>
                                    renderTransaction(transaction, i, arr)
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

const loadingState = () => (
    <div className="text-center p-4">
        <CircularProgress />
    </div>
);

const renderSubheader = (date: Date) => (
    <ListSubheader
        sx={{
            backgroundColor: "background.default",
            p: 0,
        }}
    >
        <Box
            sx={{
                backgroundColor: "background.paper",
                zIndex: 1000,
                borderRadius: "5px",
                px: 2,
            }}
            className="shadow-lg"
        >
            {formatMonthlyDate(date)}
        </Box>
    </ListSubheader>
);

const formatMonthlyDate = (date: Date) =>
    `${new Date(date).toLocaleDateString("default", {
        month: "long",
        year: "numeric",
    })}`;

const formatDailyDate = (date: Date) =>
    `${new Date(date).toLocaleDateString("default", {
        day: "2-digit",
        month: "long",
    })}`;

const renderTransaction = (
    transaction: Record<Transaction>,
    index: number,
    array: Record<Transaction>[]
) => {
    const currDate = new Date(transaction.date);

    let nextDate;

    if (array[index + 1]) {
        nextDate = new Date(array[index + 1].date);
    }

    return (
        <div key={transaction.id}>
            <TransactionListItem transaction={transaction} />
            {currDate.getDay() != nextDate?.getDay() &&
                nextDate !== undefined && (
                    <Divider
                        sx={{
                            width: "75%",
                            mx: "auto",
                        }}
                    >
                        <Typography
                            sx={{ color: "text.secondary", fontSize: 14 }}
                        >
                            {formatDailyDate(nextDate)}
                        </Typography>
                    </Divider>
                )}
        </div>
    );
};
