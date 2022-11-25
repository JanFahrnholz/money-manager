import { FC, useContext } from "react";
import { ContactContext } from "../../context/ContactContext";

const ContactListHeader: FC = () => {
    const { contacts } = useContext(ContactContext);

    return (
        <div className="bg-dark-800 m-2 p-4 rounded shadow-sm sticky">
            {contacts.length} contacts
        </div>
    );
};

export default ContactListHeader;
