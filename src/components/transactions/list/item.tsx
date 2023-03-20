import Contact from "@/types/Contact";
import LinkIcon from "@mui/icons-material/Link";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
    Avatar,
    IconButton,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
} from "@mui/material";
import Username from "features/user-profiles/components/username";
import { FC } from "react";
import { getInitials } from "../../../lib/Contacts";
import { client } from "../../../lib/Pocketbase";
import { getColor } from "../../../lib/Transactions";
import Record from "../../../types/Record";
import Transaction from "../../../types/Transaction";

interface Props {
    transaction: Record<Transaction>;
    onClick?: Function;
}

const TransactionListItem: FC<Props> = ({ transaction, onClick }) => {
    const isOwner = client.authStore.model?.id == transaction.owner;
    const contact = transaction.expand.contact as Contact;

    const secondaryAction = () => {
        return (
            <IconButton>
                <MoreHorizIcon />
            </IconButton>
        );
    };

    return (
        <ListItem
            alignItems="flex-start"
            sx={{
                my: 1,
                borderRadius: 1,
                bgcolor: "secondary.main",
                color: "secondary.contrastText",
            }}
            className="shadow border"
            secondaryAction={secondaryAction()}
            onClick={() => onClick && onClick()}
        >
            <ListItemAvatar>
                <Avatar
                    sx={{
                        bgcolor: getColor(transaction.type),
                    }}
                >
                    {isOwner ? (
                        <>{getInitials(contact.name)}</>
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
                                {contact.name}
                                {contact.user && (
                                    <span className="pl-1">🔗</span>
                                )}
                            </>
                        ) : (
                            <>
                                Linked by <Username id={contact.owner} />
                            </>
                        )}
                    </Typography>
                }
            />
        </ListItem>
    );
};

export default TransactionListItem;
