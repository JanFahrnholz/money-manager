import { Box, ListItem, ListItemText, Typography } from "@mui/material";
import { FC, useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import LogoutIcon from "@mui/icons-material/Logout";

const AuthenticatedProfile: FC = () => {
    const { user, logout } = useContext(UserContext);

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
                            <Typography variant="h5" sx={{ m: 0, p: 0 }}>
                                {user?.name}
                            </Typography>
                        }
                    />
                </ListItem>
            </Box>
        </>
    );
};
export default AuthenticatedProfile;
