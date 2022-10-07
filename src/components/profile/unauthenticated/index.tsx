import { Box, Button, ListItem, ListItemText, Typography } from "@mui/material";
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
                            <Typography variant="h5" sx={{ m: 0, p: 0 }}>
                                Welcome
                            </Typography>
                        }
                    />
                    <Button
                        variant="contained"
                        className="mx-auto mr-1"
                        href="/register"
                    >
                        Sign up
                    </Button>
                    <Button
                        variant="outlined"
                        className="mx-auto"
                        href="/login"
                    >
                        Sign in
                    </Button>
                </ListItem>
            </Box>
            <Typography sx={{ m: 1 }}>
                We now support Online Account features
            </Typography>
            <Typography sx={{ m: 1, mt: 2, color: "text.secondary" }}>
                Note: Disabled features may be updated in the future
            </Typography>
            <div className="text-center"></div>
        </>
    );
};

export default UnauthenticatedProfile;
