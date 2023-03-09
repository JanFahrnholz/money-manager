import { Avatar } from "@mui/material";
import { getInitials } from "lib/Contacts";
import { FC, ReactNode, useEffect, useState } from "react";
import useProfile from "../hooks/useProfile";
import AddIcon from "@mui/icons-material/Add";

interface ProfileAvatarProps {
    id?: string;
}

const ProfileAvatar: FC<ProfileAvatarProps> = ({ id }) => {
    const [content, setContent] = useState<string | ReactNode>(<AddIcon />);
    const { profile, get } = useProfile();

    useEffect(() => {
        if (profile?.username) setContent(getInitials(profile.username));
        if (id) get(id).then((res) => setContent(getInitials(res.username)));
    }, [id]);

    return <Avatar sx={{ backgroundColor: "primary.main" }}>{content}</Avatar>;
};

export default ProfileAvatar;
