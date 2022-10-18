import {
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Rating,
    styled,
    IconButton,
} from "@mui/material";
import { FC, useContext, useState } from "react";
import { ContactContext } from "../../../context/ContactContext";
import CircleIcon from "@mui/icons-material/Circle";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import ContactDetailDrawer from "./detail";
import Contact from "../../../types/Contact";
import { motion, AnimatePresence } from "framer-motion";

const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
        color: "#ff6d75",
    },
    "& .MuiRating-iconHover": {
        color: "#ff3d47",
    },
});

const MemberCardProcess: FC = () => {
    return (
        <StyledRating
            name="customized-color"
            defaultValue={2}
            getLabelText={(value: number) =>
                `${value} Heart${value !== 1 ? "s" : ""}`
            }
            precision={1}
            icon={<CircleIcon fontSize="inherit" />}
            emptyIcon={<CircleOutlinedIcon fontSize="inherit" />}
        />
    );
};

const ContactList: FC = () => {
    const storage = useContext(ContactContext);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [selectedContact, setSelectedContact] = useState<Contact>();
    let i = 0;

    const handleClick = (c: Contact) => {
        setSelectedContact(c);
        setOpenDrawer(!openDrawer);
    };

    return (
        <>
            <List sx={{ width: "100%", pb: 18 }}>
                <AnimatePresence>
                    {storage.contacts.map((p) => {
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
                                    onClick={() => handleClick(p)}
                                    secondaryAction={
                                        <IconButton
                                            edge="end"
                                            aria-label="delete"
                                            sx={{ mr: 1 }}
                                            onClick={() => handleClick(p)}
                                        >
                                            <KeyboardArrowRightOutlinedIcon />
                                        </IconButton>
                                    }
                                >
                                    <ListItemAvatar>
                                        <Avatar
                                            sx={{ bgcolor: "primary.main" }}
                                        >
                                            {storage.getInitials(p.id)}
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
                contact={selectedContact}
                open={openDrawer}
                setOpen={setOpenDrawer}
            />
        </>
    );
};

export default ContactList;
