import Profile from "@/types/Profile";
import { Grid, ListItem, Switch, TextField } from "@mui/material";
import { ProfileContext } from "features/user-profiles/context";
import { FC, useContext } from "react";

interface Props {
    prop: keyof Profile;
}

const ProfileUpdateFieldBoolean: FC<Props> = ({ prop }) => {
    const { profile, setProfile } = useContext(ProfileContext);

    const handleChange = (input: boolean) => {
        console.log(input);
        setProfile({ ...profile, [prop]: input } as Profile);
    };

    const val = profile ? profile[prop] : false;

    return (
        <ListItem>
            <Grid container>
                <Grid xs={6} item>
                    <span className="flex items-center m-2 ">{prop}</span>
                </Grid>
                <Grid xs={6} item>
                    <Switch
                        value={val}
                        checked={val}
                        onChange={() => handleChange(!val)}
                    />
                </Grid>
            </Grid>
        </ListItem>
    );
};

export default ProfileUpdateFieldBoolean;
