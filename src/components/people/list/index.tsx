import {
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    IconButton,
    Typography,
    CircularProgress,
} from "@mui/material";
import { FC, useContext, useEffect, useState } from "react";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import ContactDetailDrawer from "./detail";
import { motion, AnimatePresence } from "framer-motion";
import { ContactContext } from "../../../context/ContactContext";
import { getInitials } from "../../../lib/Contacts";
import MustBeLoggedInAlert from "../../misc/MustBeLoggedInAlert";

const ContactList: FC = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const [selectedContact, setSelectedContact] = useState<string>();

    const { contacts } = useContext(ContactContext);

    const [error, setError] = useState<false | string>(false);
    let i = 0;

    function handleClick(c: string) {
        setSelectedContact(c);
        setOpenDrawer(!openDrawer);
    }

    return (
        <>
            <MustBeLoggedInAlert msg="Please login to use this functions" />
            <List sx={{ width: "100%", pb: 18 }}>
                <AnimatePresence>
                    {contacts.map((p) => {
                        i += 0.05;
                        return (
                            <motion.div
                                key={p.id}
                                transition={{ duration: 0.3, delay: i }}
                                initial={{ opacity: 0, x: -100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -200 }}
                            >
                                <ListItem
                                    onClick={() => handleClick(p.id)}
                                    secondaryAction={
                                        <IconButton
                                            edge="end"
                                            aria-label="delete"
                                            sx={{ mr: 1 }}
                                            onClick={() => handleClick(p.id)}
                                        >
                                            <KeyboardArrowRightOutlinedIcon />
                                        </IconButton>
                                    }
                                >
                                    <ListItemAvatar>
                                        <Avatar
                                            sx={{ bgcolor: "primary.main" }}
                                        >
                                            {getInitials(p.name)}
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={p.name}
                                        secondary={`Balance: ${p.balance}€`}
                                    />
                                    {/* <ListItemText primary={<MemberCardProcess />} /> */}
                                </ListItem>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </List>
            <ContactDetailDrawer
                id={selectedContact}
                open={openDrawer}
                setOpen={setOpenDrawer}
            />
        </>
    );
};

export default ContactList;
