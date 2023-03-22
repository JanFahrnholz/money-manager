import AddLinkIcon from "@mui/icons-material/AddLink";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { FC, useState } from "react";
import { remove } from "../../../lib/Contacts";
import Contact from "../../../types/Contact";
import Record from "../../../types/Record";
import ConfirmationDialog from "../../misc/ConfirmationDialog";
import EditContact from "../edit";

type Props = {
    contact: Record<Contact>;
    setOpen: (open: boolean) => void;
};

const ContactDetailsWhenOwned: FC<Props> = ({ contact, setOpen }) => {
    const [editing, setEditing] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const isLinked = contact?.user != "";

    const deleteContact = () => {
        remove(contact.id).catch(() => {});
        setOpen(false);
    };

    return (
        <>
            <ConfirmationDialog
                open={confirm}
                setOpen={setConfirm}
                title="Delete contact"
                content={"Are you sure want to delete this contact"}
                disagreeText="Cancel"
                agreeText="Delete"
                action={deleteContact}
            />
            <EditContact
                open={editing}
                setOpen={setEditing}
                contact={contact}
            />
            {contact.name}
            <span className="float-right space-x-3">
                {!isLinked && (
                    <AddLinkIcon
                        onClick={() => setEditing(true)}
                        className="hover:cursor-pointer hover:text-white"
                    />
                )}

                <EditIcon
                    onClick={() => setEditing(true)}
                    className="hover:cursor-pointer hover:text-white"
                />
                <DeleteIcon
                    onClick={() => setConfirm(true)}
                    className="hover:cursor-pointer hover:text-danger"
                />
            </span>
        </>
    );
};

export default ContactDetailsWhenOwned;
