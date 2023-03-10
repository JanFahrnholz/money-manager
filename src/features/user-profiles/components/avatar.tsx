import { Avatar } from "@mui/material";
import { getInitials } from "lib/Contacts";
import { FC, ReactNode, useEffect, useState } from "react";
import useProfile from "../hooks/useProfile";
import PersonIcon from "@mui/icons-material/Person";
interface ProfileAvatarProps {
    id?: string;
    fallbackContent?: string | ReactNode;
}

const ProfileAvatar: FC<ProfileAvatarProps> = ({ id, fallbackContent }) => {
    if (!fallbackContent) fallbackContent = <PersonIcon />;
    const [content, setContent] = useState<string | ReactNode>(fallbackContent);
    const { profile, get } = useProfile();

    useEffect(() => {
        if (profile?.username) setContent(getInitials(profile.username));
        if (id)
            get(id).then((res) =>
                setContent(
                    res.username !== ""
                        ? getInitials(res.username)
                        : fallbackContent
                )
            );
    }, [id]);

    return <Avatar sx={{ backgroundColor: "primary.main" }}>{content}</Avatar>;
};

export default ProfileAvatar;
