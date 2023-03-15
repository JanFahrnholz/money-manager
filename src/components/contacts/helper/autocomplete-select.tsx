import Contact from "@/types/Contact";
import ReactHook from "@/types/react-hook";
import {
    Autocomplete,
    FormControl,
    FormHelperText,
    TextField,
} from "@mui/material";
import { ContactContext } from "context/ContactContext";
import { userId } from "lib/Pocketbase";
import { FC, useContext } from "react";

interface ContactAutocompleteProps {
    contact: Contact | undefined;
    setContact: ReactHook<Contact | undefined>;
}

const ContactAutocomplete: FC<ContactAutocompleteProps> = ({
    contact,
    setContact,
}) => {
    const { contacts } = useContext(ContactContext);

    const labeledContacts = contacts
        .filter((contact) => contact.owner === userId)
        .map((contact) => ({
            ...contact,
            label: contact.name,
        }));

    const handleChange = (contact: Contact | null) => {
        setContact(contact || undefined);
    };

    return (
        <>
            <FormControl fullWidth>
                <Autocomplete
                    renderInput={(params) => (
                        <TextField {...params} label="Contact" />
                    )}
                    options={labeledContacts}
                    onChange={(e, contact) =>
                        handleChange(contact as Contact | null)
                    }
                    isOptionEqualToValue={(option, value) =>
                        option.name === value.name
                    }
                />
                {contact && (
                    <FormHelperText>balance: {contact.balance}</FormHelperText>
                )}
            </FormControl>
        </>
    );
};

export default ContactAutocomplete;
