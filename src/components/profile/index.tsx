import { FC, useContext } from "react";
import AppVersion from "../misc/AppVersion";
import ProfileSettings from "./settings";
import { UserContext } from "../../context/UserContext";
import AuthenticatedProfile from "./authenticated";
import UnauthenticatedProfile from "./unauthenticated";

const Profile: FC = () => {
    const { user } = useContext(UserContext);

    return (
        <div>
            {user ? <AuthenticatedProfile /> : <UnauthenticatedProfile />}

            <ProfileSettings />
            <div className="fixed bottom-8 left-1/2 mb-14 center-anchor text-dark-700 z-0 w-3/4 text-center">
                MoneyManager <AppVersion />
                <br />© 2022 Industed - All rights resevered
            </div>
        </div>
    );
};

export default Profile;
