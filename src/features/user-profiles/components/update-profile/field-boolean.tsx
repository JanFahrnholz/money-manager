import Profile from "@/types/Profile";
import { ListItem, ListItemText, Switch } from "@mui/material";
import { ProfileContext } from "features/user-profiles/context";
import { FC, useContext } from "react";

interface Props {
    prop: keyof Profile;
    title?: string;
    subTitle?: string;
    disabled?: boolean;
}

const ProfileUpdateFieldBoolean: FC<Props> = ({
    prop,
    title,
    subTitle,
    disabled,
}) => {
    const { profile, setProfile } = useContext(ProfileContext);

    const handleChange = (input: boolean) => {
        setProfile({ ...profile, [prop]: input } as Profile);
    };

    const val = profile ? profile[prop] : false;

    return (
        <ListItem disabled={disabled}>
            <ListItemText primary={title || prop} secondary={subTitle} />
            <Switch
                disabled={disabled}
                value={val}
                checked={val}
                onChange={() => handleChange(!val)}
            />
        </ListItem>
    );
};

export default ProfileUpdateFieldBoolean;
