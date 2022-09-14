import { Button } from "@mui/material";
import { FC } from "react";
import useDownloader from "react-use-downloader";

const ResetProfile: FC = () => {
    const { download } = useDownloader();

    const importData = () => {};
    const exportData = () => {
        const data = JSON.stringify({
            transactions: t.transactions,
            contacts: c.contacts,
        });

        console.log(data);
    };
    const eraseData = () => {};

    return (
        <>
            <Button variant="contained" color="primary">
                Export data
            </Button>
            <Button variant="contained" color="secondary">
                Import data
            </Button>
            <Button variant="outlined" color="error">
                Erase all data
            </Button>
        </>
    );
};

export default ResetProfile;
