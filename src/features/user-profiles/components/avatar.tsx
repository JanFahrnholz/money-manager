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
    const profile = useProfile(id);

    const content = profile ? getInitials(profile.username) : fallbackContent;

    return <Avatar sx={{ backgroundColor: "primary.main" }}>{content}</Avatar>;
};

export default ProfileAvatar;
