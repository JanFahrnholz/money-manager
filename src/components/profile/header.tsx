import { Box, ListItem, ListItemText, Typography } from "@mui/material";
import { client, deleteId } from "lib/Pocketbase";
import { FC, useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ConfirmationDialog from "../misc/ConfirmationDialog";

const ProfileHeader: FC = () => {
    const [open, setOpen] = useState(false);
    const id = client.authStore.model?.id;

    const logout = () => {
        client.authStore.clear();
    };

    const del = async () => {
        if (!id) return;
        deleteId(id);
        logout();
    };

    return (
        <Box
            sx={{
                borderBottom: "solid 2px",
                borderBottomColor: "primary.main",
                p: 0,
                m: 0,
            }}
        >
            <ConfirmationDialog
                open={open}
                setOpen={setOpen}
                title="Delete your ID"
                content={
                    "This will also delete all data associated with your ID. This action cannot be undone"
                }
                disagreeText="Cancel"
                agreeText="Delete"
                action={() => del()}
            />

            <ListItem
                secondaryAction={
                    <>
                        <DeleteForeverIcon
                            className="hover:cursor-pointer"
                            onClick={() => setOpen(!open)}
                            sx={{ color: "error.main", mt: 1, mr: 2.5 }}
                        />
                        <LogoutIcon
                            className="hover:cursor-pointer"
                            onClick={() => logout()}
                            sx={{ color: "primary.main", mt: 1 }}
                        />
                    </>
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
    );
};

export default ProfileHeader;
