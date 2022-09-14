import {
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
} from "@mui/material";
import { FC, useContext } from "react";
import { ContactContext } from "../../../context/ContactContext";

const ContactList: FC = () => {
    const { storage } = useContext(ContactContext);

    return (
        <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
            {storage.contacts.map((p) => (
                <ListItem key={p.id}>
                    <ListItemAvatar>
                        <Avatar>{storage.getInitials(p.id)}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={p.name}
                        secondary={`Balance: ${p.balance}€`}
                    />
                </ListItem>
            ))}
        </List>
    );
};

export default ContactList;
