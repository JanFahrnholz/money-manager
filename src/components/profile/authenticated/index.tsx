import {
    ListItem,
    ListItemText,
    Typography,
    Box,
    TextField,
    Button,
    Grid,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { FC, useState } from "react";
import { client } from "../../../lib/Pocketbase";
import { useRouter } from "next/router";
import useCopyToClipboard from "../../../hooks/useCopyToClipboard";
import ConfirmationDialog from "../../misc/ConfirmationDialog";

const AuthenticatedProfile: FC = () => {
    const id = client.authStore.model?.id;
    const [text, copy] = useCopyToClipboard();
    const [open, setOpen] = useState(false);

    const router = useRouter();
    const logout = () => {
        client.authStore.clear();
        router.reload();
    };

    const deleteId = async () => {
        if (id === undefined) return;

        const idReference = await client.records.getFullList("ids", undefined, {
            user_id: id,
        });
        await client.records.delete("ids", idReference[0].id);

        const transactions = await client.records.getFullList(
            "transactions",
            undefined
        );
        transactions.map(async (transaction) => {
            await client.records.delete("transactions", transaction.id);
        });

        const contacts = await client.records.getFullList(
            "contacts",
            undefined
        );
        contacts.map(async (contact) => {
            await client.records.delete("contacts", contact.id);
        });

        await client.users.delete(id);
        logout();
    };

    return (
        <>
            <ConfirmationDialog
                open={open}
                setOpen={setOpen}
                title="Delete your ID"
                content={
                    "This will also delete all data associated with your ID. This action cannot be undone"
                }
                disagreeText="Cancel"
                agreeText="Delete"
                action={() => deleteId()}
            />
            <Box
                sx={{
                    borderBottom: "solid 2px",
                    borderBottomColor: "primary.main",
                    p: 0,
                    m: 0,
                }}
            >
                <ListItem
                    secondaryAction={
                        <LogoutIcon
                            className="hover:cursor-pointer"
                            onClick={() => logout()}
                            sx={{ color: "primary.main", mt: 1 }}
                        />
                    }
                >
                    <ListItemText
                        primary={
                            <Typography
                                variant="h6"
                                sx={{ m: 0, p: 0, fontWeight: 600 }}
                            >
                                MoneyManager
                            </Typography>
                        }
                    />
                </ListItem>
            </Box>
            <div className="p-2 pt-6">
                <Grid container spacing={1}>
                    <Grid item width={"45%"}>
                        <TextField
                            value={id}
                            size="small"
                            label="Your user ID"
                            fullWidth
                        />
                    </Grid>
                    <Grid item width={"20%"}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={() => copy(id || "")}
                        >
                            Copy
                        </Button>
                    </Grid>
                    <Grid item width={"35%"}>
                        <Button
                            fullWidth
                            variant="outlined"
                            color="error"
                            onClick={() => setOpen(true)}
                        >
                            Delete ID
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </>
    );
};

export default AuthenticatedProfile;
