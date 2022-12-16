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
import { formatDailyDate, formatMonthlyDate } from "../../../lib/Formatter";
import { list, sort } from "../../../lib/Transactions";
import Record from "../../../types/Record";
import SortedTransactions from "../../../types/SortedTransactions";
import Transaction from "../../../types/Transaction";
import RenderInterval from "../../misc/RenderInterval";
import EmptyTransactions from "./empty";
import TransactionListItem from "./item";

const TransactionList: FC = () => {
    const [error, setError] = useState();
    const { transactions } = useContext(TransactionContext);

    if (!transactions) return loadingState();
    if (transactions.length === 0) return <EmptyTransactions />;

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
                    subheader={<ListSubheader />}
                >
                    {transactions.map((transaction, i, arr) => {
                        return (
                            <>
                                <RenderInterval
                                    array={arr}
                                    index={i}
                                    // yearly={(date) =>
                                    //     subHeader(`${date.getFullYear()}`)
                                    // }
                                    monthly={(date) =>
                                        subHeader(formatMonthlyDate(date))
                                    }
                                    daily={(date) => dayDivider(date)}
                                />

                                <TransactionListItem
                                    key={`item-${transaction.id}`}
                                    transaction={transaction}
                                />
                            </>
                        );
                    })}
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

const subHeader = (text: string) => {
    return (
        <ListSubheader
            sx={{
                backgroundColor: "transparent",
                mb: 1,
                p: 0,
            }}
        >
            <Box
                sx={{
                    textAlign: "center",
                    backgroundColor: "background.paper",
                    zIndex: 1000,
                    borderRadius: "5px",
                    px: 2,
                }}
            >
                {text}
            </Box>
        </ListSubheader>
    );
};

const dayDivider = (date: Date) => (
    <Divider
        sx={{
            width: "75%",
            mx: "auto",
        }}
    >
        <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
            {formatDailyDate(date)}
        </Typography>
    </Divider>
);
