import { Typography } from "@mui/material";
import useProfile from "features/user-profiles/hooks/useProfile";
import { FC, useEffect, useState } from "react";

type Props = {
    id: string;
    disableId?: boolean;
};

const Username: FC<Props> = ({ id, disableId }) => {
    const [username, setUsername] = useState(disableId ? "" : id);
    const { get } = useProfile();

    useEffect(() => {
        const set = async () => {
            try {
                const profile = await get(id);
                setUsername(profile.username !== "" ? profile.username : id);
            } catch (error) {
                setUsername(id);
            }
        };
        set();
    });
    return <kbd>{username}</kbd>;
};

export default Username;
