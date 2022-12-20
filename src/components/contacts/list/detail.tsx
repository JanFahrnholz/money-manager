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
import LoadUntilDefined from "../../misc/LoadUntilDefined";
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

    const drawerBleeding = 0;
    const drawerHeight = 400;

    if (!data?.contact || !id) return <></>;

    if (loading) return <CircularProgress />;

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
                            <LoadUntilDefined value={data.transactions}>
                                test
                                {/* {data.transactions.map((t, i) => (
                                    <TableRow key={i}>
                                        <TableCell>{t.amount}€</TableCell>
                                        <TableCell>{t.type}</TableCell>
                                        <TableCell>
                                            {formatDailyDate(t.date)}
                                        </TableCell>
                                    </TableRow>
                                ))} */}
                            </LoadUntilDefined>
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

type DetailDrawerProps = {
    children: any;
    open: boolean;
    setOpen: (value: boolean) => void;
};

const DetailDrawer: FC<DetailDrawerProps> = (props) => {
    const { children, open, setOpen } = props;

    const iOS =
        typeof navigator !== "undefined" &&
        /iPad|iPhone|iPod/.test(navigator.userAgent);

    const drawerBleeding = 0;
    const drawerHeight = 400;
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
                        {children}
                    </StyledBox>
                </SwipeableDrawer>
            </Root>
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
