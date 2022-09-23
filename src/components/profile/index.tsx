import { FC } from "react";

import { version } from "../../package.json";
import AppVersion from "../misc/AppVersion";
import ProfileSettings from "./settings";

const Profile: FC = () => {
    return (
        <div>
            <ProfileSettings />
            <div className="fixed bottom-8 left-1/2 mb-14 center-anchor text-dark-700 z-0 w-3/4 text-center">
                MoneyManager <AppVersion />
                <br />© 2022 Industed - All rights resevered
            </div>
        </div>
    );
};

export default Profile;
