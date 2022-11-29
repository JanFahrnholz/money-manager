import {
    ListItem,
    IconButton,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { FC } from "react";
import { getInitials } from "../../../lib/Contacts";
import Contact from "../../../types/Contact";
import Record from "../../../types/Record";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import { client } from "../../../lib/Pocketbase";
import LinkIcon from "@mui/icons-material/Link";
import LinkedFrom from "../../misc/LinkedFrom";

type Props = {
    contact: Record<Contact>;
    delay: number;
};

const ContactListItem: FC<Props> = ({ contact, delay }) => {
    const isOwner = client.authStore.model?.id == contact.owner;

    let avatarBg = "#ffd600";
    if (!isOwner && contact.balance > 0) avatarBg = "#62D836";
    if (!isOwner && contact.balance < 0) avatarBg = "#ff1c1c";

    return (
        <motion.div
            key={`contact-${contact.id}`}
            transition={{ duration: 0.3, delay }}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -200 }}
        >
            <ListItem
                secondaryAction={
                    <IconButton edge="end" aria-label="delete" sx={{ mr: 1 }}>
                        <KeyboardArrowRightOutlinedIcon />
                    </IconButton>
                }
            >
                <ListItemAvatar>
                    <Avatar sx={{ bgcolor: avatarBg }}>
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
                    primary={
                        !isOwner ? (
                            <LinkedFrom txt={contact.owner} />
                        ) : (
                            <>
                                {!isOwner && "imported"}
                                {contact.name}
                                {contact.user && (
                                    <span className="pl-1">🔗</span>
                                )}
                            </>
                        )
                    }
                    secondary={`Balance: ${contact.balance}€`}
                />
                {/* <ListItemText primary={<MemberCardProcess />} /> */}
            </ListItem>
        </motion.div>
    );
};

export default ContactListItem;
