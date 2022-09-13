import {
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Typography,
    Divider,
    IconButton,
} from "@mui/material";
import { FC, useContext } from "react";
import { ContactContext } from "../../../context/ContactContext";
import { TransactionContext } from "../../../context/TransactionContext";
import Transaction from "../../../types/Transaction";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import PaidIcon from "@mui/icons-material/Paid";

const TransactionListItem: FC<{ transaction: Transaction }> = ({
    transaction,
}) => {
    const tCtx = useContext(TransactionContext);
    const { storage } = useContext(ContactContext);

    const type = tCtx.storage.getTypeById(transaction.typeId);
    const contact = storage.findById(transaction.personId);

    const secondaryAction = () => {
        if (tCtx.storage.isType(transaction.id, "Rechnung")) {
            if (tCtx.storage.getIsPaid(transaction.id)) {
                return (
                    <IconButton edge="end" sx={{ mr: 1 }} aria-label="delete">
                        <PaidIcon />
                    </IconButton>
                );
            }

            return (
                <IconButton edge="end" sx={{ mr: 1 }} aria-label="delete">
                    <MoneyOffIcon />
                </IconButton>
            );
        }
    };

    return (
        <ListItem
            key={transaction.id}
            alignItems="flex-start"
            sx={{ my: 1, bgcolor: type?.color, borderRadius: 1 }}
            className="shadow border"
            secondaryAction={secondaryAction()}
        >
            <ListItemAvatar>
                <Avatar>{storage.getInitials(transaction.personId)}</Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={`${type?.name} ${transaction.amount}€`}
                secondary={
                    <Typography
                        sx={{
                            display: "inline",
                        }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                    >
                        {contact?.name}
                    </Typography>
                }
            />
        </ListItem>
    );
};

export default TransactionListItem;
