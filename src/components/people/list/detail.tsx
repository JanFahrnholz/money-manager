import { Global } from "@emotion/react";
import {
    Box,
    CssBaseline,
    FormControl,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Paper,
    Skeleton,
    styled,
    SwipeableDrawer,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { FC, SyntheticEvent, useContext, useState } from "react";
import { TransactionContext } from "../../../context/TransactionContext";
import Contact from "../../../types/Contact";
import StampcardProcessWidget from "../../misc/StampcardProcessWidget";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { ContactContext } from "../../../context/ContactContext";
import DoneIcon from "@mui/icons-material/Done";
import { VisibilityOff, Visibility } from "@mui/icons-material";

type Props = {
    contact: Contact | undefined;
    open: boolean;
    setOpen: (open: boolean) => void;
    window?: () => Window;
};

const ContactDetailDrawer: FC<Props> = ({ contact, open, setOpen, window }) => {
    const storage = useContext(TransactionContext);
    const contacts = useContext(ContactContext);
    const [editing, setEditing] = useState(false);

    if (!contact) return;

    const iOS =
        typeof navigator !== "undefined" &&
        /iPad|iPhone|iPod/.test(navigator.userAgent);

    const drawerBleeding = 0;
    const drawerHeight = 400;
    const transactions = contact.transactions
        .map((t) => storage.findById(t))
        .reverse();

    const formatDate = (date: Date) =>
        `${new Date(date).toLocaleDateString("default", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        })}`;

    const deleteContact = (id: number) => {
        contacts.delete(id);
        setOpen(false);
    };

    const editName = (name: string) => {
        contacts.editName(contact.id, name);
    };

    return (
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
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() =>
                                                    setEditing(false)
                                                }
                                                edge="end"
                                            >
                                                <DoneIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        )}

                        <span className="float-right space-x-3">
                            <EditIcon
                                onClick={() => setEditing(!editing)}
                                className="hover:cursor-pointer hover:text-white"
                            />
                            <DeleteIcon
                                onClick={() => deleteContact(contact.id)}
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
                        Balance: {contact.balance}€
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
                                {transactions.map((t) => (
                                    <TableRow key={t?.id}>
                                        <TableCell>{t?.amount}€</TableCell>
                                        <TableCell>
                                            {storage.getTypeById(t?.id)?.name}
                                        </TableCell>
                                        <TableCell>
                                            {formatDate(t?.date)}
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
