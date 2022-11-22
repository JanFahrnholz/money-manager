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
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import ConfirmationDialog from "../../misc/ConfirmationDialog";
import { remove } from "../../../lib/Contacts";
import { client } from "../../../lib/Pocketbase";
import Record from "../../../types/Record";
import Transaction from "../../../types/Transaction";

interface Props {
    id: string | undefined;
    open: boolean;
    setOpen: (open: boolean) => void;
}

const ContactDetailDrawer: FC<Props> = ({ id, open, setOpen }) => {
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [confirm, setConfirm] = useState(false);
    const [contact, setContact] = useState<Record<Contact>>();
    const [transactions, setTransactions] = useState<Record<Transaction>[]>([]);

    const iOS =
        typeof navigator !== "undefined" &&
        /iPad|iPhone|iPod/.test(navigator.userAgent);

    const drawerBleeding = 0;
    const drawerHeight = 400;
    const totalCashflow = 0;

    useEffect(() => {
        if (!id) return;
        client.records
            .getOne("contacts", id)
            .then((res: unknown) => {
                setContact(res as Record<Contact>);
                setLoading(false);
            })
            .catch((err) => console.log(err));

        client.records
            .getFullList("transactions", 20, {
                filter: `contact="${id}"`,
                sort: "-created",
            })
            .then((res: unknown) => {
                setTransactions(res as Record<Transaction>[]);
            })
            .catch((err) => console.log(err));
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

    const deleteContact = () => {
        remove(contact.id).catch((err) => console.log(err));
        setOpen(false);
    };

    const editName = (name: string) => {};

    const editBalance = (balance: number) => {};

    if (loading) return <CircularProgress />;

    return (
        <Root>
            <ConfirmationDialog
                open={confirm}
                setOpen={setConfirm}
                title="Delete contact"
                content={"Are you sure want to delete this contact"}
                disagreeText="Cancel"
                agreeText="Delete"
                action={deleteContact}
            />
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
                        {!editing && contact.name}

                        {editing && (
                            <FormControl variant="standard">
                                <Input
                                    id="outlined-adornment-password"
                                    type="text"
                                    defaultValue={contact.name}
                                    onChange={(e) => editName(e.target.value)}
                                />
                            </FormControl>
                        )}

                        <span className="float-right space-x-3">
                            {!editing ? (
                                <EditIcon
                                    onClick={() => setEditing(!editing)}
                                    className="hover:cursor-pointer hover:text-white"
                                />
                            ) : (
                                <DoneIcon
                                    onClick={() => setEditing(!editing)}
                                    className="hover:cursor-pointer hover:text-white"
                                />
                            )}
                            <DeleteIcon
                                onClick={() => setConfirm(true)}
                                className="hover:cursor-pointer hover:text-danger"
                            />
                        </span>
                    </Typography>

                    <Typography
                        sx={{
                            p: 2,
                            color: "text.secondary",
                            bgcolor: "background.default",
                        }}
                    >
                        {!editing && (
                            <>
                                Balance: {contact.balance}€ + Cashflow:{" "}
                                {totalCashflow}€
                            </>
                        )}
                        {editing && (
                            <FormControl variant="standard">
                                <Input
                                    id="outlined-adornment-password"
                                    type="number"
                                    defaultValue={contact.balance}
                                    onChange={(e) =>
                                        editBalance(+e.target.value)
                                    }
                                />
                            </FormControl>
                        )}
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
                                    <TableRow key={i}>
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
