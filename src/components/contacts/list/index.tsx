import { FormControl, InputLabel, List, MenuItem, Select } from "@mui/material";
import { AnimatePresence } from "framer-motion";
import useSortContacts from "hooks/useSortContacts";
import { FC, useContext, useState } from "react";
import { ContactContext } from "../../../context/ContactContext";
import ContactDetailDrawer from "./detail";
import EmptyContactList from "./empty";
import ContactListItem from "./item";

const ContactList: FC = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const [selectedContact, setSelectedContact] = useState<string>();
    const { contacts } = useContext(ContactContext);
    const sort = useSortContacts(contacts, ["updated", "balance", "name"]);
    let i = 0;

    if (contacts.length === 0) return <EmptyContactList />;

    function handleClick(c: string) {
        setSelectedContact(c);
        setOpenDrawer(!openDrawer);
    }

    return (
        <>
            <FormControl sx={{ m: 1, minWidth: 80 }}>
                <InputLabel id="contact-sort-select-label">Sort</InputLabel>
                <Select
                    labelId="contact-sort-select-label"
                    id="contact-sort-select"
                    value={sort.selected}
                    onChange={(e) => sort.select(e.target.value)}
                    autoWidth
                    label="Sort"
                    size="small"
                >
                    {sort.options.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <List sx={{ width: "100%", pb: 18 }}>
                <AnimatePresence>
                    {sort.contacts.map((c) => {
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
