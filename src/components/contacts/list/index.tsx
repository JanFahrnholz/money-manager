import { FormControl, InputLabel, List, MenuItem, Select } from "@mui/material";
import useSelect from "hooks/useSelect";
import useSortContacts from "hooks/useSortContacts";
import { getCashflow } from "lib/Statistics";
import { FC, useContext, useMemo, useState } from "react";
import { ContactContext } from "../../../context/ContactContext";
import ContactDetailDrawer from "./detail";
import EmptyContactList from "./empty";
import ContactListItem from "./item";

const ContactList: FC = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const [selectedContact, setSelectedContact] = useState<string>();
    const { contacts } = useContext(ContactContext);
    const sort = useSortContacts(contacts, ["updated", "balance"]);
    let i = 0;

    if (contacts.length === 0) return <EmptyContactList />;

    function handleClick(c: string) {
        setSelectedContact(c);
        setOpenDrawer(!openDrawer);
    }

    return (
        <>
            <div>
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
            </div>

            <List sx={{ width: "100%", pb: 18 }}>
                {sort.contacts.map((c) => {
                    i += 0.05;
                    return (
                        <div key={c.id} onClick={() => handleClick(c.id)}>
                            <ContactListItem contact={c} delay={i} />
                        </div>
                    );
                })}
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
