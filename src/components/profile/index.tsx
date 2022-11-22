import { FC } from "react";
import { client } from "../../lib/Pocketbase";
import AppVersion from "../misc/AppVersion";
import AuthenticatedProfile from "./authenticated";
import UnauthenticatedProfile from "./unauthenticated";

const Profile: FC = () => {
    return (
        <div>
            {client.authStore.isValid ? (
                <AuthenticatedProfile />
            ) : (
                <UnauthenticatedProfile />
            )}

            <div className="fixed bottom-8 left-1/2 mb-14 center-anchor text-dark-700 z-0 w-3/4 text-center">
                MoneyManager <AppVersion />
                <br />© 2022 Industed - All rights resevered
            </div>
        </div>
    );
};

export default Profile;
