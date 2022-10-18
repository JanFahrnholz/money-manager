import { Divider, Typography, Button } from "@mui/material";
import { FC, useContext } from "react";
import { ContactContext } from "../../../../context/ContactContext";
import { TransactionContext } from "../../../../context/TransactionContext";
import useCopyToClipboard from "../../../../hooks/useCopyToClipboard";

const ExportData: FC = () => {
    const t = useContext(TransactionContext);
    const c = useContext(ContactContext);
    const [value, copy] = useCopyToClipboard();

    const exportData = () => {
        const data = JSON.stringify({
            transactions: t.transactions,
            contacts: c.contacts,
        });
        copy(data);
    };
    return (
        <div className="py-2">
            <Divider className="my-2">Export</Divider>
            <Typography sx={{ color: "text.secondary" }}>
                Your data will be exported and copied to your clipboard as a
                JSON string. You can transfer your data to diffrent devices
                using this text
            </Typography>
            <Typography sx={{ textAlign: "center", my: 2 }}>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => exportData()}
                >
                    Export data
                </Button>
            </Typography>
        </div>
    );
};

export default ExportData;
