import User from "@/types/User";
import { ListItem, ListItemText, Switch } from "@mui/material";
import { FC, useState } from "react";
import toast from "react-hot-toast";
import useSetting from "../hooks/useSetting";
import useUser from "../hooks/useUser";

interface Props {
    prop: keyof User;
    title?: string;
    subTitle?: string;
    disabled?: boolean;
}

const UserUpdateFieldBoolean: FC<Props> = ({
    prop,
    title,
    subTitle,
    disabled,
}) => {
    const { user, update } = useUser();
    const init = useSetting(prop);
    const [value, setValue] = useState(init || false);
    if (!user) return <></>;

    const handleChange = async (input: boolean) => {
        try {
            await update({ id: user.id, [prop]: input });
            setValue(input);
        } catch (e) {
            toast.error("Could not update");
        }
    };

    return (
        <ListItem disabled={disabled}>
            <ListItemText primary={title || prop} secondary={subTitle} />
            <Switch
                value={value}
                checked={value}
                onChange={() => handleChange(!value)}
                disabled={disabled}
            />
        </ListItem>
    );
};

export default UserUpdateFieldBoolean;
