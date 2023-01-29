import Profile from "@/types/Profile";
import useTrigger from "hooks/useTrigger";
import { client } from "lib/Pocketbase";
import { Props } from "next/script";
import { createContext, FC, useEffect, useState } from "react";
import get from "./get";

type ContextProps = {
    profile: Profile | undefined;
    setProfile: (profile: Profile | undefined) => void;
    reload: () => void;
};
export const ProfileContext = createContext<ContextProps>(undefined!);

const ProfileContextProvider: FC<Props> = (props) => {
    const [profile, setProfile] = useState<Profile | undefined>();
    const [trigger, reload] = useTrigger();

    useEffect(() => {
        const fetch = async () => {
            setProfile(await get());
        };

        fetch();
    }, [trigger]);

    return (
        <ProfileContext.Provider value={{ profile, setProfile, reload }}>
            {props.children}
        </ProfileContext.Provider>
    );
};

export default ProfileContextProvider;
