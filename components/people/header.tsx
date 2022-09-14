import { FC, useContext } from "react";
import { ContactContext } from "../../context/ContactContext";

const ContactListHeader: FC = () => {
    const storage = useContext(ContactContext);

    return (
        <>
            <div className="bg-gray-200 m-2 p-4 rounded shadow-sm">
                {storage.contacts.length} contacts
            </div>
        </>
    );
};

export default ContactListHeader;
