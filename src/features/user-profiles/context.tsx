import Profile from "@/types/Profile";
import useTrigger from "hooks/useTrigger";
import { client } from "lib/Pocketbase";
import { Props } from "next/script";
import { createContext, FC, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import get from "./get";
const _ = require("lodash");

type ContextProps = {
    profile: Profile | undefined;
    setProfile: (profile: Profile | undefined) => void;
    reload: () => void;
    unsaved: boolean;
    save: () => void;
};
export const ProfileContext = createContext<ContextProps>(undefined!);

const ProfileContextProvider: FC<Props> = (props) => {
    const [profile, setProfile] = useState<Profile | undefined>();
    const [initial, setInitial] = useState<Profile | undefined>();
    const [unsaved, setUnsaved] = useState(false);
    const [trigger, reload] = useTrigger();

    useEffect(() => {
        const fetch = async () => {
            const fetched = await get();
            setProfile(fetched);
            setInitial(fetched);
        };

        fetch();
    }, [trigger]);

    useEffect(() => {
        setUnsaved(!_.isEqual(initial, profile));
    }, [profile, initial]);

    const save = async () => {
        if (!unsaved) return;
        if (!profile?.id) return;
        try {
            const p = await client
                .collection("profiles")
                .update<Profile>(profile.id, profile);
            setProfile(p);
            setInitial(p);
            toast.success("Profile updated");
        } catch (error) {
            toast.error("Could not update profile");
        }
    };

    return (
        <ProfileContext.Provider
            value={{
                profile,
                setProfile,
                reload,
                unsaved,
                save,
            }}
        >
            {props.children}
        </ProfileContext.Provider>
    );
};

export default ProfileContextProvider;
