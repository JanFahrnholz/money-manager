import { Box, ListItem, ListItemText, Typography } from "@mui/material";
import { client } from "lib/Pocketbase";
import { FC } from "react";
import LogoutIcon from "@mui/icons-material/Logout";

const ProfileHeader: FC = () => {
    const logout = () => {
        client.authStore.clear();
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
    );
};

export default ProfileHeader;
