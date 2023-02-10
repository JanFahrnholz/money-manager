import Profile from "@/types/Profile";
import { ListItem, ListItemText, TextField } from "@mui/material";
import { ProfileContext } from "features/user-profiles/context";
import { FC, useContext } from "react";

interface Props {
    prop: keyof Profile;
    placeholder: string;
    helperText?: string;
    title?: string;
    subTitle?: string;
}

const ProfileUpdateFieldString: FC<Props> = ({
    prop,
    placeholder,
    helperText,
    title,
    subTitle,
}) => {
    const { profile, setProfile } = useContext(ProfileContext);

    const handleChange = (input: string) => {
        setProfile({ ...profile, [prop]: input } as Profile);
    };

    const val = profile ? profile[prop] : "";

    return (
        <ListItem>
            <ListItemText primary={title || prop} secondary={subTitle} />

            <TextField
                size="small"
                value={val}
                onChange={(e) => handleChange(e.target.value)}
                placeholder={placeholder}
                helperText={helperText}
            />
        </ListItem>
    );
};

export default ProfileUpdateFieldString;
