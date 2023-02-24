import { client } from "lib/Pocketbase";
import { useContext } from "react";
import toast from "react-hot-toast";
import { InsightContext } from "../context";
import Insights from "../types/Insights";

const useInsights = (key: string) => {
    const id = client.authStore.model?.id;

    const { setInsights } = useContext(InsightContext);

    const enable = async () => {
        try {
            const insights = await client
                .collection("profiles")
                .create<Insights>({ user: id });
            setInsights(insights);
            toast.success("Profile created");
        } catch (error) {
            toast.error("Could not create profile");
        }
    };

    return { enable };
};

export default useInsights;
