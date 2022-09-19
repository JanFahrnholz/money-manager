import { Button, TextField } from "@mui/material";
import { FC, useContext, useState } from "react";
import useDownloader from "react-use-downloader";
import { ContactContext } from "../../context/ContactContext";
import { TransactionContext } from "../../context/TransactionContext";
import fs from "fs";
import useCopyToClipboard from "../../hooks/useCopyToClipboard";

const ResetProfile: FC = () => {
    const { download } = useDownloader();
    const t = useContext(TransactionContext);
    const c = useContext(ContactContext);
    const [value, copy] = useCopyToClipboard();
    const [data, setImportData] = useState("");

    const importData = () => {
        console.log(data);
        const { transactions, contacts } = JSON.parse(data);
        t.setTransactions(transactions);
        c.setContacts(contacts);
    };
    const exportData = () => {
        const data = JSON.stringify({
            transactions: t.transactions,
            contacts: c.contacts,
        });
        copy(data);
    };
    const eraseData = () => {
        t.setTransactions([]);
        c.setContacts([]);
    };

    return (
        <>
            <Button
                variant="contained"
                color="primary"
                onClick={() => exportData()}
            >
                Export data
            </Button>
            <Button
                variant="contained"
                color="secondary"
                onClick={() => importData()}
            >
                Import data
            </Button>
            <TextField
                label="Import Data"
                variant="outlined"
                onChange={(e) => setImportData(e.target.value)}
            />

            <Button
                variant="outlined"
                color="error"
                onClick={() => eraseData()}
            >
                Erase all data
            </Button>
        </>
    );
};

export default ResetProfile;
