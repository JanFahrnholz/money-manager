import { Box, Grid, List, ListItem, TextField } from "@mui/material";
import useProfile from "features/user-profiles/hooks/useProfile";
import { FC } from "react";

const UpdateProfile: FC = () => {
    const profile = useProfile();

    if (!profile) return <></>;

    return (
        <>
            <List>
                <ListItem
                    secondaryAction={
                        <TextField size="small" placeholder="john-doe" />
                    }
                >
                    username
                </ListItem>
            </List>
        </>
    );
};

export default UpdateProfile;
