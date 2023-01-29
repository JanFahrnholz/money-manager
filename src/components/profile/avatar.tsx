import { Avatar } from "@mui/material";
import { FC } from "react";

const ProfileAvatar: FC = () => {
    return (
        <>
            <div className="my-6">
                <Avatar
                    sx={{
                        mx: "auto",
                        width: 128,
                        height: 128,
                        backgroundColor: "primary.main",
                    }}
                ></Avatar>
            </div>
        </>
    );
};
export default ProfileAvatar;
