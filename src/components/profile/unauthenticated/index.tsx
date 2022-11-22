import {
    Box,
    Button,
    Divider,
    ListItem,
    ListItemText,
    Typography,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { FC } from "react";

const UnauthenticatedProfile: FC = () => {
    return (
        <>
            <Box
                sx={{
                    borderBottom: "solid 2px",
                    borderBottomColor: "primary.main",
                    p: 0,
                    m: 0,
                }}
            >
                <ListItem>
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
                    <Button
                        variant="contained"
                        className="mx-auto mr-1"
                        href="/register"
                    >
                        Create ID
                    </Button>
                    <Button
                        variant="outlined"
                        className="mx-auto"
                        href="/login"
                    >
                        Login
                    </Button>
                </ListItem>
            </Box>

            <div className="p-2">
                <Typography sx={{ my: 2 }}>
                    MoneyManager now uses unique user IDs to handle your data.{" "}
                    <br />
                    No username, no email!
                </Typography>
                <Divider />
                <Typography sx={{ my: 2 }}>
                    If you decide to delete your account, all transactions and
                    contacts associated with your ID will automatically be
                    deleted.
                </Typography>
                <Typography sx={{ my: 1, color: "text.secondary" }}>
                    Note: Deleted IDs cannot be recovered
                </Typography>
            </div>
        </>
    );
};

export default UnauthenticatedProfile;
