import { Divider, Typography, Button, TextField } from "@mui/material";
import { FC, useContext, useState } from "react";
import { ContactContext } from "../../../../context/ContactContext";
import { TransactionContext } from "../../../../context/TransactionContext";

const ImportData: FC = () => {
    const [data, setImportData] = useState("");
    const t = useContext(TransactionContext);
    const c = useContext(ContactContext);

    const importData = () => {
        const { transactions, contacts } = JSON.parse(data);
        t.setTransactions(transactions);
        c.setContacts(contacts);
    };
    return (
        <div className="py-2">
            <Divider className="my-2">Import</Divider>
            <Typography sx={{ color: "text.secondary" }}>
                Paste your previously exported data string and click import to
                recover your data.
            </Typography>
            <Typography sx={{ my: 2 }}>
                <TextField
                    label="Import Data"
                    placeholder="{transactions: [...], contacts: [...]}"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setImportData(e.target.value)}
                />
                <Typography sx={{ textAlign: "center" }}>
                    <Button
                        variant="outlined"
                        sx={{ mt: 2 }}
                        color="primary"
                        onClick={() => importData()}
                    >
                        Import data
                    </Button>
                </Typography>
            </Typography>
        </div>
    );
};

export default ImportData;
