import {
    Button,
    Card,
    CardActions,
    CardContent,
    Grid,
    Typography,
} from "@mui/material";

import { modifyBalance, update } from "lib/User";
import { FC, useContext, useMemo, useState } from "react";
import { ContactContext } from "../../context/ContactContext";
import { TransactionContext } from "../../context/TransactionContext";
import { getMoneyToPayBack, getPendingMoney } from "../../lib/Statistics";
import LoadValue from "./LoadValue";
import EditIcon from "@mui/icons-material/Edit";
import PrivacyMode from "./PrivacyMode";
import usePersistentState from "hooks/usePersistentStorage";
import { PrivacyModeContext } from "context/PrivacyModeContext";
import FullscreenMenu from "./FullscreenMenu";
import Numpad from "./numpad";
import { client } from "lib/Pocketbase";
import useUser from "features/user-settings/hooks/useUser";
const StatsHeader: FC = () => {
    const { contacts } = useContext(ContactContext);
    const { transactions } = useContext(TransactionContext);
    const [open, setOpen] = useState(false);
    const { toggle } = useContext(PrivacyModeContext);
    const { user } = useUser();

    const pendingMoney = useMemo(() => getPendingMoney(contacts), [contacts]);
    const toPay = useMemo(() => getMoneyToPayBack(contacts), [contacts]);

    const calcNetWorth = () => {
        if (!user?.balance) return;
        if (user.balance <= 0) return;

        return user.balance + pendingMoney - toPay;
    };

    const netWorth = calcNetWorth();

    return (
        <>
            <UpdateBalanceMenu
                open={open}
                setOpen={setOpen}
                initial={user?.balance || 0}
            />
            <Grid container spacing={1} p={1}>
                <Grid item xs={4}>
                    <Card onClick={() => setOpen(!open)}>
                        <CardContent>
                            <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                            >
                                balance
                            </Typography>
                            <Typography variant="h5">
                                <PrivacyMode>
                                    <LoadValue
                                        value={user?.balance.toFixed(2)}
                                    />
                                    €
                                </PrivacyMode>
                            </Typography>
                        </CardContent>
                    </Card>
                    {/* <Typography
					sx={{
						color: "text.secondary",
						textAlign: "center",
						mt: 1,
					}}
				>
					<EditIcon fontSize="small" sx={{ scale: 0.5 }} />
				</Typography> */}
                </Grid>
                <Grid item xs={4}>
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
                                <PrivacyMode>
                                    <LoadValue
                                        value={pendingMoney.toFixed(2)}
                                    />
                                    €
                                </PrivacyMode>
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={4}>
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
                                <PrivacyMode>
                                    <LoadValue value={toPay.toFixed(2)} />€
                                </PrivacyMode>
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            {netWorth !== undefined && (
                <PrivacyMode disableIcon>
                    <div className="bg-dark-900 p-2 m-2 mt-0 text-center rounded ">
                        Net worth: {netWorth.toFixed(2)}€
                    </div>
                </PrivacyMode>
            )}
        </>
    );
};

interface UpdateBalanceMenuProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    initial: number;
}

const UpdateBalanceMenu: FC<UpdateBalanceMenuProps> = ({
    open,
    setOpen,
    initial,
}) => {
    const [balance, setBalance] = useState(initial);
    const id = client.authStore.model?.id;

    const updateBalance = async () => {
        if (!id) return;
        try {
            await update(id, { balance });
            setOpen(false);
        } catch (e) {}
    };

    return (
        <FullscreenMenu
            open={open}
            setOpen={setOpen}
            headerText={"edit balance"}
            doneText="save"
            onDone={updateBalance}
        >
            <Typography
                variant="h2"
                sx={{
                    textAlign: "center",
                    my: 3.5,
                    fontWeight: "500",
                    letterSpacing: 1.5,
                }}
            >
                {balance.toFixed(2)}€
            </Typography>
            <Numpad setter={setBalance} />
            <div className="text-center">
                <Button sx={{ mt: 4 }} onClick={() => setBalance(initial)}>
                    Reset
                </Button>
            </div>
        </FullscreenMenu>
    );
};

export default StatsHeader;
