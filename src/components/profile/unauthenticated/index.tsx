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

            <div className="text-center"></div>
        </>
    );
};

export default UnauthenticatedProfile;
