import { Box, Grid, List, ListItem, TextField } from "@mui/material";
import useProfile from "features/user-profiles/hooks/useProfile";
import useUpdate from "features/user-profiles/hooks/useUpdate";
import { FC } from "react";
import ProfileUpdateField from "./field";

const UpdateProfile: FC = () => {
    const profile = useProfile();
    const update = useUpdate();

    if (!profile) return <></>;

    return (
        <>
            <List>
                <ListItem>
                    <ProfileUpdateField
                        prop="username"
                        placeholder="john-doe"
                        helperText="max. 10 charakters"
                    />
                </ListItem>
            </List>
        </>
    );
};

export default UpdateProfile;
