import DetailDrawer from "@/components/misc/DetailDrawer";
import { Global } from "@emotion/react";
import {
    Box,
    CircularProgress,
    CssBaseline,
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
import { useTimeout } from "usehooks-ts";
import useFetchContactDetails from "../../../hooks/useFetchContactDetails";
import { formatDailyDate } from "../../../lib/Formatter";
import { client } from "../../../lib/Pocketbase";
import { getCashflow } from "../../../lib/Statistics";
import Contact from "../../../types/Contact";
import Record from "../../../types/Record";
import Transaction from "../../../types/Transaction";
import LinkedFrom from "../../misc/LinkedFrom";
import Loader from "../../misc/Loader";
import ContactDetailsWhenOwned from "./isOwner";

interface Props {
    id: string | undefined;
    open: boolean;
    setOpen: (open: boolean) => void;
}

const ContactDetailDrawer: FC<Props> = ({ id, open, setOpen }) => {
    const { data, loading, error } = useFetchContactDetails(id);
    const isOwner = client.authStore.model?.id == data?.contact?.owner;

    const iOS =
        typeof navigator !== "undefined" &&
        /iPad|iPhone|iPod/.test(navigator.userAgent);

    const drawerHeight = 400;

    if (error) return <ErrorDrawer open={open} setOpen={setOpen} />;
    if (loading || !data)
        return <LoadingDrawer open={open} setOpen={setOpen} />;

    return (
        <>
            <DetailDrawer open={open} setOpen={setOpen}>
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
                            contact={data.contact}
                            setOpen={setOpen}
                        />
                    ) : (
                        <LinkedFrom txt={data.contact.owner} />
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
                        Balance: {data.contact.balance}€
                        {isOwner && <> Cashflow: {data.cashflow}€</>}
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
                            <Loader value={!loading}>
                                {data.transactions.map((t, i) => (
                                    <TableRow key={i}>
                                        <TableCell>{t.amount}€</TableCell>
                                        <TableCell>{t.type}</TableCell>
                                        <TableCell>
                                            {formatDailyDate(t.date)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </Loader>
                        </TableBody>
                    </Table>
                </TableContainer>
            </DetailDrawer>

            {/* <TransactionDetailMenu
                transaction={currentTransaction}
                open={menuOpen}
                setOpen={setMenuOpen}
            /> */}
        </>
    );
};

export default ContactDetailDrawer;

const LoadingDrawer: FC<{
    open: boolean;
    setOpen: (open: boolean) => void;
}> = ({ open, setOpen }) => {
    return (
        <>
            <DetailDrawer open={open} setOpen={setOpen}>
                {/* <Typography
                    sx={{
                        p: 2,
                        color: "text.secondary",
                        bgcolor: "background.paper",
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                    }}
                >
                    loading...
                </Typography>

                <Typography
                    sx={{
                        p: 2,
                        color: "text.secondary",
                        bgcolor: "background.default",
                    }}
                >
                    Balance: loading...
                </Typography> */}

                {/* <StampcardProcessWidget contact={contact} /> */}

                <Loader value={false} />
            </DetailDrawer>
        </>
    );
};

const ErrorDrawer: FC<{
    open: boolean;
    setOpen: (open: boolean) => void;
}> = ({ open, setOpen }) => {
    return (
        <>
            <DetailDrawer open={open} setOpen={setOpen}>
                <Typography
                    sx={{
                        p: 2,
                        color: "text.secondary",
                        bgcolor: "background.paper",
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                    }}
                >
                    loading...
                </Typography>

                <Typography
                    sx={{
                        p: 2,
                        color: "text.secondary",
                        bgcolor: "background.default",
                    }}
                >
                    Balance: loading...
                </Typography>

                {/* <StampcardProcessWidget contact={contact} /> */}

                <Loader value={false} />
            </DetailDrawer>
        </>
    );
};
