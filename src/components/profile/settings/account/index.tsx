import {
    Button,
    List,
    ListItem,
    ListItemText,
    Typography,
} from "@mui/material";
import { FC, useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../context/UserContext";
import MustBeLoggedInAlert from "../../../misc/MustBeLoggedInAlert";

type Detail = {
    name: string;
    value: string | undefined;
};

const AccountSettings: FC = () => {
    const { user, account } = useContext(UserContext);

    const [disabled, setDisabled] = useState(true);
    const [devices, setDevices] = useState<number | string>("all");

    useEffect(() => {
        setDisabled(user ? false : true);

        account
            .listSessions()
            .then((sessions) => setDevices(sessions.total))
            .catch((err) => setDevices("all"));
    }, [user]);

    const details: Detail[] = [
        {
            name: "E-Mail",
            value: user?.email || "-",
        },
        {
            name: "Registration",
            value: user?.registration
                ? new Date(user?.registration).toLocaleDateString()
                : "--.--.----",
        },
    ];

    return (
        <>
            <MustBeLoggedInAlert msg="You must be logged in to use these functions" />
            <List
                sx={{
                    width: "100%",
                    p: 0,
                    m: 0,
                    bgcolor: "background.default",
                }}
            >
                {details.map((detail, i) => (
                    <ListItem key={i} disabled={disabled}>
                        <ListItemText primary={detail.name} />
                        <Typography sx={{ color: "text.secondary" }}>
                            {detail.value}
                        </Typography>
                    </ListItem>
                ))}

                <ListItem
                    disabled={disabled}
                    secondaryAction={
                        <Button
                            variant="outlined"
                            color="error"
                            disabled={disabled}
                        >
                            Logout
                        </Button>
                    }
                >
                    <ListItemText primary={`Logout on ${devices} devices`} />
                </ListItem>
                <ListItem
                    disabled
                    secondaryAction={
                        <Button
                            variant="contained"
                            color="error"
                            disabled={disabled}
                        >
                            Delete
                        </Button>
                    }
                >
                    <ListItemText primary={"Delete account"} />
                </ListItem>
            </List>
        </>
    );
};

export default AccountSettings;
