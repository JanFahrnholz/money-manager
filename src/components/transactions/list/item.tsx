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

const TransactionListItem: FC<{ transaction: Record<Transaction> }> = ({
    transaction,
}) => {
    const [openActions, setOpenActions] = useState(false);
    const isOwner = client.authStore.model?.id == transaction.owner;

    const formatDate = (date: Date) => {
        return `${new Date(date).toLocaleDateString("default", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        })}`;
    };

    const actions = [
        {
            name: formatDate(transaction.date),
            action: () => {},
            color: undefined as undefined | string,
        },
    ];
    if (isOwner)
        actions.push({
            name: "Delete",
            action: () => remove(transaction.id),
            color: "#ff1c1c",
        });

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
                            <>
                                <Typography
                                    sx={{
                                        color: "text.secondary",
                                        display: "inline",
                                    }}
                                >
                                    linked from{" "}
                                    <Typography
                                        sx={{
                                            display: "inline",
                                            color: "white",
                                        }}
                                    >
                                        {/* {transaction.expand.owner.username} */}
                                        {transaction.owner}
                                    </Typography>
                                </Typography>
                            </>
                        )}
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
