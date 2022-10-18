import { Divider, Typography, Button } from "@mui/material";
import { FC, useContext, useState } from "react";
import { ContactContext } from "../../../../context/ContactContext";
import { TransactionContext } from "../../../../context/TransactionContext";
import { UserContext } from "../../../../context/UserContext";
import ConfirmationDialog from "../../../misc/ConfirmationDialog";

const EraseData: FC = () => {
    const t = useContext(TransactionContext);
    const c = useContext(ContactContext);
    const { sync, setSyncDisabled } = useContext(UserContext);

    const [open, setOpen] = useState(false);

    const eraseData = () => {
        setSyncDisabled(true);
        t.setTransactions([]);
        c.setContacts([]);
        setSyncDisabled(false);
    };
    return (
        <div className="py-2">
            <ConfirmationDialog
                open={open}
                setOpen={setOpen}
                title="Erase local data"
                content={
                    <>
                        This will delete all your local data <br />
                        Note: Your backups wont be effected
                    </>
                }
                disagreeText="Cancel"
                agreeText="Erase"
                action={eraseData}
            />

            <Divider className="my-2">Erase</Divider>
            <Typography sx={{ color: "text.secondary", my: 2 }}>
                This will erase all your local data from this device.
                <br />
                <b>This action cannot be undone</b>
            </Typography>
            <Typography sx={{ textAlign: "center" }}>
                <Button
                    variant="contained"
                    color="error"
                    onClick={() => setOpen(true)}
                >
                    Erase all data
                </Button>
            </Typography>
        </div>
    );
};

export default EraseData;
