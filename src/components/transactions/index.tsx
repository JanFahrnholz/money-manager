import { FC } from "react";
import AddTransaction from "./add";
import StatsHeader from "../misc/StatsHeader";
import TransactionList from "./list";
import TransactionLoadingList from "../misc/loading-list";
import UserHelp from "../misc/user-help";
import { Divider, Paper, Typography } from "@mui/material";

const Transactions: FC = () => {
    const secondaryStyle = "text-dark-600";
    return (
        <>
            <StatsHeader />
            <TransactionList />
            <UserHelp storageKey="help-transaction">
                <Paper sx={{ p: 1, m: 1 }}>
                    <Divider sx={{ pb: 2 }}>balance, pending and toPay</Divider>
                    <Typography>
                        Balance:{" "}
                        <span className={secondaryStyle}>
                            money you should have in your wallet.
                        </span>
                    </Typography>
                    <Typography>
                        pending:{" "}
                        <span className={secondaryStyle}>
                            the sum of all negative contact balances
                        </span>
                    </Typography>
                    <Typography>
                        toPay:{" "}
                        <span className={secondaryStyle}>
                            the sum of all positive contact balances.
                        </span>
                    </Typography>
                    <br />
                    <Divider sx={{ pb: 2 }}>Transactions</Divider>
                    <Typography>
                        Transactions modify your balance and contact balances.
                    </Typography>
                    <br />
                    <Divider sx={{ pb: 2 }}>Transaction types</Divider>
                    <Typography>
                        Einnahme:{" "}
                        <span className={secondaryStyle}>
                            adds the amount to your balance
                        </span>
                    </Typography>
                    <Typography>
                        Ausgabe:{" "}
                        <span className={secondaryStyle}>
                            subtracts the amount from your balance
                        </span>
                    </Typography>
                    <Typography>
                        Rechnung:{" "}
                        <span className={secondaryStyle}>
                            subtracts the amount from the contact balance
                        </span>
                    </Typography>
                    <Typography>
                        Rückzahlung:{" "}
                        <span className={secondaryStyle}>
                            add the amount to the contact balance and adds it to
                            your balance
                        </span>
                    </Typography>
                </Paper>
            </UserHelp>
            {/* <TransactionLoadingList /> */}
            <AddTransaction />
        </>
    );
};

export default Transactions;
