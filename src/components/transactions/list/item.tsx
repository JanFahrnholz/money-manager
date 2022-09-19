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
    const cCtx = useContext(ContactContext);

    const type = tCtx.getTypeById(transaction.typeId);
    const contact = cCtx.findById(transaction.personId);

    const secondaryAction = () => {
        if (tCtx.isType(transaction.id, "Rechnung")) {
            if (cCtx.findById(transaction.personId)?.balance >= 0) {
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
            sx={{
                my: 1,
                borderRadius: 1,
                bgcolor: "background.paper",
                color: "secondary.contrastText",
            }}
            className="shadow border"
            secondaryAction={secondaryAction()}
        >
            <ListItemAvatar>
                <Avatar
                    sx={{
                        bgcolor: type?.color,
                    }}
                >
                    {cCtx.getInitials(transaction.personId)}
                </Avatar>
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
                    >
                        {contact?.name}
                    </Typography>
                }
            />
        </ListItem>
    );
};

export default TransactionListItem;