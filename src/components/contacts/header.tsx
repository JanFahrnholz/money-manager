import { FC, useContext } from "react";
import { ContactContext } from "../../context/ContactContext";

const ContactListHeader: FC = () => {
    const { contacts } = useContext(ContactContext);
    const totalOpenInvoices = contacts.reduce(
        (total, contact) => (contact.balance !== 0 ? ++total : total),
        0
    );

    const renderTotalOpenInvoices = () =>
        totalOpenInvoices > 0 && <>- {totalOpenInvoices} open payments</>;

    return (
        <div className="bg-dark-800 m-2 p-4 rounded shadow-sm sticky">
            {contacts.length} contacts {renderTotalOpenInvoices()}
        </div>
    );
};

export default ContactListHeader;
