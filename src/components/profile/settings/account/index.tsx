import {
    Button,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Switch,
    TextField,
    Typography,
} from "@mui/material";
import { FC, useContext } from "react";
import { UserContext } from "../../../../context/UserContext";

type Detail = {
    name: string;
    value: string | undefined;
};

const AccountSettings: FC = () => {
    const { user, useSync } = useContext(UserContext);
    if (!user)
        return (
            <ListItem>
                <Typography sx={{ color: "text.secondary" }}>
                    Please log in to see your account options
                </Typography>
            </ListItem>
        );

    const [syncContacts, setSyncContacts] = useSync("syncContacts", false);
    const [syncTransactions, setSyncTransactions] = useSync(
        "syncTransactions",
        false
    );

    const details: Detail[] = [
        {
            name: "E-Mail",
            value: user?.email,
        },
        {
            name: "Registration",
            value: new Date(user.registration).toLocaleDateString(),
        },
    ];

    return (
        <List
            sx={{
                width: "100%",
                p: 0,
                m: 0,
                bgcolor: "background.default",
            }}
        >
            {details.map((detail, i) => (
                <ListItem key={i}>
                    <ListItemText primary={detail.name} />
                    <Typography sx={{ color: "text.secondary" }}>
                        {detail.value || "-"}
                    </Typography>
                </ListItem>
            ))}

            <ListItem
                secondaryAction={
                    <Switch
                        checked={syncTransactions}
                        onClick={() => setSyncTransactions(!syncTransactions)}
                    />
                }
            >
                <ListItemText primary={"Backup Transactions"} />
            </ListItem>

            <ListItem
                secondaryAction={
                    <Switch
                        checked={syncContacts}
                        onClick={() => setSyncContacts(!syncContacts)}
                    />
                }
            >
                <ListItemText primary={"Backup Contacts"} />
            </ListItem>
            <ListItem
                disabled
                secondaryAction={
                    <Button variant="contained" color="error">
                        Delete
                    </Button>
                }
            >
                <ListItemText primary={"Delete account"} />
            </ListItem>
        </List>
    );
};

export default AccountSettings;
