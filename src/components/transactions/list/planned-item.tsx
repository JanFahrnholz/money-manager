import ClearIcon from "@mui/icons-material/Clear";
import DoneIcon from "@mui/icons-material/Done";
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
import { confirm, remove } from "lib/PlannedTransactions";
import { FC, useState } from "react";
import { getInitials } from "../../../lib/Contacts";
import { client } from "../../../lib/Pocketbase";
import { getColor } from "../../../lib/Transactions";
import Record from "../../../types/Record";
import Transaction from "../../../types/Transaction";
import LinkedFrom from "../../misc/LinkedFrom";
import TransactionDetailMenu from "../menu";

const PlannedTransactionListItem: FC<{ transaction: Record<Transaction> }> = ({
	transaction,
}) => {
	const [openActions, setOpenActions] = useState(false);
	const isOwner = client.authStore.model?.id == transaction.owner;

	const secondaryAction = () => {
		return (
			<>
				{isOwner && (
					<>
						<IconButton onClick={() => confirm(transaction)}>
							<DoneIcon />
						</IconButton>
						<IconButton onClick={() => remove(transaction)}>
							<ClearIcon />
						</IconButton>
					</>
				)}
				<IconButton onClick={() => setOpenActions(!openActions)}>
					<MoreHorizIcon />
				</IconButton>
			</>
		);
	};

    return (
        <ListItem
            key={transaction.id}
            alignItems="flex-start"
            sx={{
                my: 1,
                borderRadius: 1,
                bgcolor: "secondary.main",
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
                primary={`${transaction.type} ${transaction.amount}€ - ${transaction.info}`}
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

export default PlannedTransactionListItem;
