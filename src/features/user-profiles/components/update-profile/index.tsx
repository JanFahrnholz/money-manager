import { Button, List, ListItem } from "@mui/material";
import { ProfileContext } from "features/user-profiles/context";
import useProfile from "features/user-profiles/hooks/useProfile";
import { FC, useContext } from "react";
import ProfileUpdateField from "./field";

const UpdateProfile: FC = () => {
    const { profile } = useProfile();
    const { unsaved, save } = useContext(ProfileContext);

    if (!profile) return <></>;

    return (
        <>
            <List>
                <ProfileUpdateField
                    prop="username"
                    placeholder="john-doe"
                    helperText="max. 10 characters"
                />
            </List>
            <Button
                variant="contained"
                fullWidth
                disabled={!unsaved}
                onClick={() => save()}
            >
                Save
            </Button>
        </>
    );
};

export default UpdateProfile;
