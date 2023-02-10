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
}

const UserUpdateFieldBoolean: FC<Props> = ({ prop, title, subTitle }) => {
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
        <ListItem>
            <ListItemText primary={title || prop} secondary={subTitle} />
            <Switch
                value={value}
                checked={value}
                onChange={() => handleChange(!value)}
            />
        </ListItem>
    );
};

export default UserUpdateFieldBoolean;
