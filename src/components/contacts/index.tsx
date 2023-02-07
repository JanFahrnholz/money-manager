import { Divider, Paper, Typography } from "@mui/material";
import { FC } from "react";
import UserHelp from "../misc/user-help";
import AddContact from "./add";
import ContactListHeader from "./header";
import ContactList from "./list";

const People: FC = () => {
    return (
        <>
            <ContactListHeader />
            <ContactList />
            <UserHelp storageKey="help-contacts">
                <Paper sx={{ p: 1, m: 1 }}>
                    <Divider sx={{ pb: 2 }}>Contacts</Divider>
                    <Typography>
                        Here you can add new contacts and see more details on
                        specific contacts.
                    </Typography>
                    <br />
                    <Typography>
                        Every contacts has a balance which is zero by default.
                        The contact balance can be modified by transactions.
                    </Typography>
                    <br />
                    <Typography>
                        Every contact can also link a user by ID. You can add
                        links to existing contacts
                    </Typography>
                    <br />
                    <Typography>
                        if a user linked your id, the contact will be displayed
                        here
                    </Typography>
                </Paper>
            </UserHelp>
            <AddContact />
        </>
    );
};

export default People;
