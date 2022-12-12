import {
    Card,
    CardContent,
    CircularProgress,
    Grid,
    Typography,
} from "@mui/material";
import { FC, useContext, useEffect, useState } from "react";
import { useBoolean } from "usehooks-ts";
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
    // const loading = useBoolean(true);
    const [loading, setLoading] = useState(true);
    const [balance, setBalance] = useState(0);
    const { contacts } = useContext(ContactContext);
    const { transactions } = useContext(TransactionContext);

    useEffect(() => {
        setPendingMoney(getPendingMoney(contacts));
        setToPay(getMoneyToPayBack(contacts));
        setBalance(getBalance(transactions));
        setLoading(false);
    }, [contacts, transactions]);

    return (
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
                            pending
                        </Typography>
                        <Typography variant="h5">
                            {loading ? (
                                <CircularProgress size={40} />
                            ) : (
                                <>{pendingMoney}</>
                            )}
                            €
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
                            to pay
                        </Typography>
                        <Typography variant="h5">
                            {loading ? <CircularProgress size={40} /> : toPay}€
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default StatsHeader;
