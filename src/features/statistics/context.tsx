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
    children: ReactNode;
    insights: Insights | undefined;
    setInsights: Dispatch<SetStateAction<Insights | undefined>>;
};
export const InsightContext = createContext<ContextProps>(undefined!);

const InsightContextProvider: FC = (props) => {
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
            {props.children}
        </InsightContext.Provider>
    );
};

export default InsightContextProvider;
