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

    const handleClick = (c: Contact) => {
        setSelectedContact(c);
        setOpenDrawer(!openDrawer);
    };

    return (
        <>
            <List sx={{ width: "100%" }}>
                {storage.contacts.map((p) => (
                    <>
                        <ListItem
                            key={p.id}
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
                                <Avatar sx={{ bgcolor: "primary.main" }}>
                                    {storage.getInitials(p.id)}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={p.name}
                                secondary={`Balance: ${p.balance}€`}
                            />
                            {/* <ListItemText primary={<MemberCardProcess />} /> */}
                        </ListItem>
                    </>
                ))}
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
