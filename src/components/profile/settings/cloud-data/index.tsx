import { List } from "@mui/material";
import { FC } from "react";
import MustBeLoggedInAlert from "../../../misc/MustBeLoggedInAlert";
import CloudDataContacts from "./contacts";
import CloudDataTransactions from "./transactions";

const CloudDataSettings: FC = () => {
    return (
        <>
            <MustBeLoggedInAlert msg="You must be logged in to use these functions" />
            <List
                sx={{
                    width: "100%",
                    p: 0,
                    m: 0,
                    mt: 1,
                    bgcolor: "background.default",
                }}
            >
                <CloudDataTransactions />

                <CloudDataContacts />
            </List>
        </>
    );
};
export default CloudDataSettings;
