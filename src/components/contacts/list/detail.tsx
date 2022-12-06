import { Global } from "@emotion/react";
import {
    Box,
    CircularProgress,
    CssBaseline,
    FormControl,
    Input,
    styled,
    SwipeableDrawer,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import Contact from "../../../types/Contact";
import ConfirmationDialog from "../../misc/ConfirmationDialog";
import { remove } from "../../../lib/Contacts";
import { client } from "../../../lib/Pocketbase";
import Record from "../../../types/Record";
import Transaction from "../../../types/Transaction";
import ContactDetailsWhenOwned from "./isOwner";
import { getCashflow } from "../../../lib/Statistics";
import LinkedFrom from "../../misc/LinkedFrom";
import TransactionDetailMenu from "../../transactions/menu";

interface Props {
    id: string | undefined;
    open: boolean;
    setOpen: (open: boolean) => void;
}

const ContactDetailDrawer: FC<Props> = ({ id, open, setOpen }) => {
    const [totalCashflow, setTotalCashflow] = useState(0);
    const [loading, setLoading] = useState(true);
    const [menuOpen, setMenuOpen] = useState(false);
    const [contact, setContact] = useState<Record<Contact>>();
    const [transactions, setTransactions] = useState<Record<Transaction>[]>([]);
    const [currentTransaction, setCurrentTransaction] =
        useState<Record<Transaction>>();
    const isOwner = client.authStore.model?.id == contact?.owner;

    const iOS =
        typeof navigator !== "undefined" &&
        /iPad|iPhone|iPod/.test(navigator.userAgent);

    const drawerBleeding = 0;
    const drawerHeight = 400;

    useEffect(() => {
        if (!id) return;

        setLoading(true);

        const contacts = client
            .collection("contacts")
            .getOne(id, { expand: "owner" })
            .then((res: unknown) => {
                setContact(res as Record<Contact>);
                setLoading(false);
            })
            .catch((err) => console.log(err));

        const transactions = client
            .collection("transactions")
            .getFullList(20, {
                filter: `contact="${id}"`,
                sort: "-created",
            })
            .then((res: unknown) => {
                setTransactions(res as Record<Transaction>[]);
                setTotalCashflow(getCashflow(res as Record<Transaction>[]));
            })
            .catch((err) => console.log(err));

        Promise.all([transactions, contacts]).then(() => setLoading(false));
    }, [id]);

    if (!contact) return <></>;

    const formatDate = (date: Date | undefined) => {
        if (!date) return "Error";

        return `${new Date(date).toLocaleDateString("default", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        })}`;
    };

    if (loading) return <CircularProgress />;

    return (
        <>
            <Root>
                <CssBaseline />
                <Global
                    styles={{
                        ".MuiDrawer-root > .MuiPaper-root": {
                            height: `${drawerHeight}px`,
                            overflow: "visible",
                            borderRadius: 8,
                            background: "#303030",
                            opacity: 1,
                            zIndex: 1600,
                        },
                    }}
                />
                <SwipeableDrawer
                    open={open}
                    anchor="bottom"
                    swipeAreaWidth={drawerBleeding}
                    disableSwipeToOpen={false}
                    disableBackdropTransition={!iOS}
                    disableDiscovery={iOS}
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                >
                    <StyledBox
                        sx={{
                            position: "absolute",
                            top: -drawerBleeding,
                            borderTopLeftRadius: 8,
                            borderTopRightRadius: 8,
                            height: `${drawerHeight}px`,
                            visibility: "visible",
                            right: 0,
                            left: 0,
                        }}
                    >
                        <Puller />
                        <Typography
                            sx={{
                                p: 2,
                                color: "text.secondary",
                                bgcolor: "background.paper",
                                borderTopLeftRadius: 8,
                                borderTopRightRadius: 8,
                            }}
                        >
                            {isOwner ? (
                                <ContactDetailsWhenOwned
                                    contact={contact}
                                    setOpen={setOpen}
                                />
                            ) : (
                                <LinkedFrom txt={contact.owner} />
                            )}
                        </Typography>

                        <Typography
                            sx={{
                                p: 2,
                                color: "text.secondary",
                                bgcolor: "background.default",
                            }}
                        >
                            <>
                                Balance: {contact.balance}€
                                {isOwner && <> Cashflow: {totalCashflow}€</>}
                            </>
                        </Typography>

                        {/* <StampcardProcessWidget contact={contact} /> */}

                        <TableContainer sx={{ maxHeight: drawerHeight - 125 }}>
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Amount</TableCell>
                                        <TableCell>Type</TableCell>
                                        <TableCell>Date</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {transactions.map((t, i) => (
                                        <TableRow
                                            key={i}
                                            onClick={() => {
                                                setCurrentTransaction(t);
                                                setMenuOpen(true);
                                            }}
                                        >
                                            <TableCell>{t.amount}€</TableCell>
                                            <TableCell>{t.type}</TableCell>
                                            <TableCell>
                                                {formatDate(t.date)}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </StyledBox>
                </SwipeableDrawer>
            </Root>

            {/* <TransactionDetailMenu
                transaction={currentTransaction}
                open={menuOpen}
                setOpen={setMenuOpen}
            /> */}
        </>
    );
};

const Root = styled("div")(({ theme }) => ({
    height: "100%",
    backgroundColor: theme.palette.background.default,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
}));

const Puller = styled(Box)(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: theme.palette.background.default,
    borderRadius: 3,
    position: "absolute",
    top: 8,
    left: "calc(50% - 15px)",
}));

const StyledBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
}));

export default ContactDetailDrawer;
