import { client, userId } from "lib/Pocketbase";
import {
    createContext,
    Dispatch,
    FC,
    ReactNode,
    SetStateAction,
    useEffect,
    useState,
} from "react";
import Insights from "./types/Insights";
const _ = require("lodash");

type ContextProps = {
    insights: Insights | undefined;
    setInsights: Dispatch<SetStateAction<Insights | undefined>>;
};
export const InsightContext = createContext<ContextProps>(undefined!);

const InsightContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [insights, setInsights] = useState<Insights | undefined>();

    useEffect(() => {
        const fetch = async () => {
            const fetched = await client
                .collection("insights")
                .getFirstListItem<Insights>(`user.id=${userId}`);
            setInsights(fetched);
        };

        fetch();
    }, []);

    return (
        <InsightContext.Provider
            value={{
                insights,
                setInsights,
            }}
        >
            {children}
        </InsightContext.Provider>
    );
};

export default InsightContextProvider;
