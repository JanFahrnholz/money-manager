import { useContext } from "react";
import { ProfileContext } from "../context";

const useProfile = () => {
    const { profile } = useContext(ProfileContext);

    return profile;
};

export default useProfile;
