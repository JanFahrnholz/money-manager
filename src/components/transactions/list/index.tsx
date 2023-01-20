import TransactionRecord from "@/types/TransactionRecord";
import {
    CircularProgress,
    Divider,
    List,
    ListSubheader,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { FC, useContext, useState } from "react";
import { TransactionContext } from "../../../context/TransactionContext";
import { formatDailyDate, formatMonthlyDate } from "../../../lib/Formatter";
import RenderInterval from "../../misc/RenderInterval";
import TransactionDetailMenu from "../menu";
import EmptyTransactions from "./empty";
import TransactionListItem from "./item";
import PlannedTransactionListItem from "./planned-item";

const TransactionList: FC = () => {
    const { transactions, plannedTransactions, loading } =
        useContext(TransactionContext);

    const [menuTransaction, setMenuTransaction] = useState<
        TransactionRecord | undefined
    >();
    const [openActions, setOpenActions] = useState(false);

    if (loading || !transactions || !plannedTransactions) return loadingState();
    if (transactions.length === 0 && plannedTransactions.length === 0)
        return <EmptyTransactions />;

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
                    {plannedTransactions.length !== 0 && (
                        <>{subHeader("Planned transactions")}</>
                    )}
                    {plannedTransactions.map((transaction) => (
                        <PlannedTransactionListItem
                            key={transaction.id}
                            transaction={transaction}
                        />
                    ))}

                    {transactions.map((transaction, i, arr) => {
                        return (
                            <>
                                <RenderInterval
                                    array={arr}
                                    index={i}
                                    monthly={(date) =>
                                        subHeader(formatMonthlyDate(date))
                                    }
                                    daily={(date) => dayDivider(date)}
                                />

                                <TransactionListItem
                                    key={`item-${transaction.id}`}
                                    transaction={transaction}
                                    onClick={() => {
                                        setMenuTransaction(transaction);
                                        setOpenActions(!openActions);
                                    }}
                                />
                            </>
                        );
                    })}
                </List>
                <TransactionDetailMenu
                    transaction={menuTransaction}
                    open={openActions}
                    setOpen={setOpenActions}
                />
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
