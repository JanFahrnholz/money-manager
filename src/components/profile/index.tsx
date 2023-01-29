import { Divider } from "@mui/material";
import CreateProfile from "features/user-profiles/components/create-profile";
import DeleteProfile from "features/user-profiles/components/delete-profile";
import UpdateProfile from "features/user-profiles/components/update-profile";
import { FC } from "react";
import UserIdCopy from "../misc/UserIdCopy";
import Watermark from "../misc/watermark";
import ProfileAvatar from "./avatar";
import ProfileHeader from "./header";

const Profile: FC = () => {
    return (
        <>
            <ProfileHeader />
            <div className="p-2">
                <div className="text-center">
                    <ProfileAvatar />
                    <div>
                        <UserIdCopy />
                    </div>
                </div>

                <div className="my-4">
                    <Divider sx={{ color: "text.secondary" }}>
                        Your profile
                    </Divider>
                </div>

                <CreateProfile />
                <UpdateProfile />
                <DeleteProfile />

                <div className="fixed bottom-8 left-1/2 mb-14 center-anchor text-dark-700 z-0 w-3/4 text-center">
                    <Watermark />
                </div>
            </div>
        </>
    );
};

export default Profile;
