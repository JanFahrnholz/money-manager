import Profile from "@/types/Profile";
import { Grid, ListItem, Switch, TextField } from "@mui/material";
import { ProfileContext } from "features/user-profiles/context";
import { FC, useContext } from "react";

interface Props {
    prop: keyof Profile;
    placeholder: string;
    helperText?: string;
}

const ProfileUpdateFieldString: FC<Props> = ({
    prop,
    placeholder,
    helperText,
}) => {
    const { profile, setProfile } = useContext(ProfileContext);

    const handleChange = (input: string) => {
        setProfile({ ...profile, [prop]: input } as Profile);
    };

    const val = profile ? profile[prop] : "";

    return (
        <ListItem>
            <Grid container>
                <Grid xs={6} item>
                    <span className="flex items-center m-2 ">{prop}</span>
                </Grid>
                <Grid xs={6} item>
                    <TextField
                        size="small"
                        fullWidth
                        value={val}
                        onChange={(e) => handleChange(e.target.value)}
                        placeholder={placeholder}
                        helperText={helperText}
                    />
                </Grid>
            </Grid>
        </ListItem>
    );
};

export default ProfileUpdateFieldString;
