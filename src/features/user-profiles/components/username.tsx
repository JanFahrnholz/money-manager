import { Chip } from "@mui/material";
import useProfile from "features/user-profiles/hooks/useProfile";
import { FC } from "react";

type Props = {
    id: string;
    disableId?: boolean;
};

const Username: FC<Props> = ({ id, disableId }) => {
    const profile = useProfile(id);

    const display = profile === undefined ? id : profile.username;

    return <Chip label={display} size="small" />;
};

export default Username;
