import {
    ListItem,
    Button,
    ListItemText,
    Switch,
    Divider,
    Grid,
} from "@mui/material";
import { FC, useContext, useEffect, useState } from "react";
import { ContactContext } from "../../../../context/ContactContext";
import { UserContext } from "../../../../context/UserContext";
import useSync from "../../../../hooks/useSync";
import Backup from "../../../../types/Backup";
import Contact from "../../../../types/Contact";
import ConfirmationDialog from "../../../misc/ConfirmationDialog";

const CloudDataContacts: FC = () => {
    const { user, getPreferences } = useContext(UserContext);
    const { backup, restore, deleteBackup, contacts } =
        useContext(ContactContext);

    const [lastSync, setLastSync] = useState<string>("--.--.----"!);
    const [disabled, setDisabled] = useState(true);

    const [restoreOpen, setRestoreOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    useEffect(() => {
        setDisabled(user ? false : true);

        const fetch = async () => {
            const pref: Promise<Backup<Contact[]>> = getPreferences("contacts");

            pref.then((pref) => {
                if (!pref) return;
                setLastSync(new Date(pref.time).toLocaleString());
            });
        };
        fetch();
    }, [user, contacts]);

    const [syncContacts, setSyncContacts] = useSync("syncContacts", false);
    return (
        <>
            <ConfirmationDialog
                open={restoreOpen}
                setOpen={setRestoreOpen}
                title="Are you sure you want to restore your cloud data"
                content="This will overwrite your local contacts"
                agreeText="Restore"
                disagreeText="Cancel"
                action={restore}
            />

            <ConfirmationDialog
                open={deleteOpen}
                setOpen={setDeleteOpen}
                title="Are you sure you want to delete your cloud data"
                content="This will delete all contacts cloud data associated with your account"
                agreeText="Delete"
                disagreeText="Cancel"
                action={deleteBackup}
            />
            <Divider sx={{ my: 2 }}>Contact backups</Divider>
            <ListItem disabled={disabled}>
                <Grid
                    container
                    justifyContent="space-evenly"
                    alignItems="center"
                    direction="row"
                    spacing={2}
                >
                    <Grid item xs={4}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            disabled={disabled}
                            onClick={() => backup()}
                        >
                            Backup
                        </Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button
                            fullWidth
                            variant="outlined"
                            color="primary"
                            disabled={disabled}
                            onClick={() => setRestoreOpen(true)}
                        >
                            Restore
                        </Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button
                            fullWidth
                            variant="outlined"
                            color="error"
                            disabled={disabled}
                            onClick={() => setDeleteOpen(true)}
                        >
                            Delete
                        </Button>
                    </Grid>
                </Grid>
            </ListItem>
            <ListItem
                disabled={disabled}
                secondaryAction={
                    <Switch
                        disabled={disabled}
                        checked={syncContacts}
                        onClick={() => setSyncContacts(!syncContacts)}
                    />
                }
            >
                <ListItemText primary={"Enable cloud sync"} />
            </ListItem>
            <ListItem disabled={disabled && !syncContacts}>
                <ListItemText
                    sx={{ color: "text.secondary" }}
                    primary={`Last synced: ${lastSync}`}
                />
            </ListItem>
        </>
    );
};

export default CloudDataContacts;
