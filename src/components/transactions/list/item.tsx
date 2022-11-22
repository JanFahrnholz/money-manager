import {
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Typography,
    IconButton,
} from "@mui/material";
import { FC, useContext, useState } from "react";
import Transaction from "../../../types/Transaction";
import ActionMenu from "../../misc/ActionMenu";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Record from "../../../types/Record";
import { getInitials } from "../../../lib/Contacts";
import { getColor, remove } from "../../../lib/Transactions";

const TransactionListItem: FC<{ transaction: Record<Transaction> }> = ({
    transaction,
}) => {
    const [openActions, setOpenActions] = useState(false);

    const actions = [
        {
            name: "Delete",
            action: () => remove(transaction.id),
            color: "#ff1c1c",
        },
    ];

    const secondaryAction = () => {
        return (
            <IconButton onClick={() => setOpenActions(!openActions)}>
                <MoreHorizIcon />
            </IconButton>
        );
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
                        bgcolor: getColor(transaction.type),
                    }}
                >
                    {getInitials(transaction["@expand"].contact.name)}
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={`${transaction.type} ${transaction.amount}€`}
                secondary={
                    <Typography
                        sx={{
                            display: "inline",
                        }}
                        component="span"
                        variant="body2"
                    >
                        {transaction["@expand"].contact.name}
                    </Typography>
                }
            />
            <ActionMenu
                actions={actions}
                open={openActions}
                setOpen={setOpenActions}
            />
        </ListItem>
    );
};

export default TransactionListItem;
