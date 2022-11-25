import { FormControl, Input } from "@mui/material";
import { FC, useState } from "react";
import Contact from "../../../types/Contact";
import Record from "../../../types/Record";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import ConfirmationDialog from "../../misc/ConfirmationDialog";
import { remove } from "../../../lib/Contacts";

type Props = {
    contact: Record<Contact>;
    setOpen: (open: boolean) => void;
};

const ContactDetailsWhenOwned: FC<Props> = ({ contact, setOpen }) => {
    const [editing, setEditing] = useState(false);
    const [confirm, setConfirm] = useState(false);

    const editName = (name: string) => {};

    const deleteContact = () => {
        remove(contact.id).catch((err) => console.log(err));
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
            {!editing && contact.name}

            {editing && (
                <FormControl variant="standard">
                    <Input
                        type="text"
                        defaultValue={contact.name}
                        onChange={(e) => editName(e.target.value)}
                    />
                </FormControl>
            )}

            <span className="float-right space-x-3">
                {!editing ? (
                    <EditIcon
                        onClick={() => setEditing(!editing)}
                        className="hover:cursor-pointer hover:text-white"
                    />
                ) : (
                    <DoneIcon
                        onClick={() => setEditing(!editing)}
                        className="hover:cursor-pointer hover:text-white"
                    />
                )}
                <DeleteIcon
                    onClick={() => setConfirm(true)}
                    className="hover:cursor-pointer hover:text-danger"
                />
            </span>
        </>
    );
};

export default ContactDetailsWhenOwned;
