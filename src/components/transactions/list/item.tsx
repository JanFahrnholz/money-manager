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
import { client } from "../../../lib/Pocketbase";
import LinkIcon from "@mui/icons-material/Link";
import LinkedFrom from "../../misc/LinkedFrom";
import TransactionDetailMenu from "../menu";

const TransactionListItem: FC<{ transaction: Record<Transaction> }> = ({
    transaction,
}) => {
    const [openActions, setOpenActions] = useState(false);
    const isOwner = client.authStore.model?.id == transaction.owner;

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
                    {isOwner ? (
                        <>{getInitials(transaction.expand.contact.name)}</>
                    ) : (
                        <>
                            <LinkIcon />
                        </>
                    )}
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
                        {isOwner ? (
                            <>
                                {transaction.expand.contact.name}
                                {transaction.expand.contact.user && (
                                    <span className="pl-1">🔗</span>
                                )}
                            </>
                        ) : (
                            <LinkedFrom txt={transaction.owner} />
                        )}
                    </Typography>
                }
            />
            <TransactionDetailMenu
                transaction={transaction}
                open={openActions}
                setOpen={setOpenActions}
            />
        </ListItem>
    );
};

export default TransactionListItem;
