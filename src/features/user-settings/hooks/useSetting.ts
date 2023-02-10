import User from "@/types/User";
import useUser from "./useUser";

const useSetting = (key: keyof User) => {
    const { user } = useUser();
    if (!user) return;
    return user[key] || false;
};

export default useSetting;
