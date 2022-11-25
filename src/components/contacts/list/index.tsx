import { FC, useContext, useState } from "react";
import ContactDetailDrawer from "./detail";
import { AnimatePresence } from "framer-motion";
import { ContactContext } from "../../../context/ContactContext";
import MustBeLoggedInAlert from "../../misc/MustBeLoggedInAlert";
import ContactListItem from "./item";
import { List } from "@mui/material";
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
                    {contacts.map((c) => {
                        i += 0.05;
                        return (
                            <div key={c.id} onClick={() => handleClick(c.id)}>
                                <ContactListItem contact={c} delay={i} />
                            </div>
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
