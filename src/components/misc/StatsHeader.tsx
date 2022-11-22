import { Card, CardContent, Grid, Typography } from "@mui/material";
import { FC, useContext, useEffect, useState } from "react";
import { ContactContext } from "../../context/ContactContext";
import { TransactionContext } from "../../context/TransactionContext";
import {
    getBalance,
    getMoneyToPayBack,
    getPendingMoney,
} from "../../lib/Statistics";

const StatsHeader: FC = () => {
    const [pendingMoney, setPendingMoney] = useState(0);
    const [toPay, setToPay] = useState(0);
    const [balance, setBalance] = useState(0);
    const { contacts } = useContext(ContactContext);
    const { transactions } = useContext(TransactionContext);

    useEffect(() => {
        setPendingMoney(getPendingMoney(contacts));
    }, [contacts]);

    useEffect(() => {
        setToPay(getMoneyToPayBack(contacts));
    }, [contacts]);

    useEffect(() => {
        setBalance(getBalance(transactions));
    }, [transactions]);

    return (
        <>
            <Grid container spacing={1} p={1}>
                {/* <Grid item xs={4}>
                    <Card>
                        <CardContent>
                            <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                            >
                                Balance
                            </Typography>
                            <Typography variant="h5" component="div">
                                {balance}€
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid> */}
                <Grid item xs={6}>
                    <Card>
                        <CardContent>
                            <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                            >
                                Pending
                            </Typography>
                            <Typography variant="h5">
                                {pendingMoney}€
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Card>
                        <CardContent>
                            <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                            >
                                to Pay
                            </Typography>
                            <Typography variant="h5">{toPay}€</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
};

export default StatsHeader;
