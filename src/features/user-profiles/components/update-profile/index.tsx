import { Button, List, ListItem } from "@mui/material";
import { ProfileContext } from "features/user-profiles/context";
import useProfile from "features/user-profiles/hooks/useProfile";
import { FC, useContext } from "react";
import ProfileUpdateFieldBoolean from "./field-boolean";
import ProfileUpdateFieldString from "./field-string";

const UpdateProfile: FC = () => {
    const { profile } = useProfile();
    const { unsaved, save } = useContext(ProfileContext);

    if (!profile) return <></>;

    return (
        <>
            <List>
                <ProfileUpdateFieldString
                    prop="username"
                    placeholder="john-doe"
                    helperText="max. 10 characters"
                />
                <ProfileUpdateFieldBoolean prop="seller" />
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
