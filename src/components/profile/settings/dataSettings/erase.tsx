import { Divider, Typography, Button } from "@mui/material";
import { FC, useContext } from "react";
import { ContactContext } from "../../../../context/ContactContext";
import { TransactionContext } from "../../../../context/TransactionContext";

const EraseData: FC = () => {
    const t = useContext(TransactionContext);
    const c = useContext(ContactContext);

    const eraseData = () => {
        t.setTransactions([]);
        c.setContacts([]);
    };
    return (
        <div className="py-2">
            <Divider className="my-2">Erase</Divider>
            <Typography sx={{ color: "text.secondary", my: 2 }}>
                This will erase all data from this device.
                <br />
                <b>This action cannot be undone</b>
            </Typography>
            <Typography sx={{ textAlign: "center" }}>
                <Button
                    variant="contained"
                    color="error"
                    onClick={() => eraseData()}
                >
                    Erase all data
                </Button>
            </Typography>
        </div>
    );
};

export default EraseData;
