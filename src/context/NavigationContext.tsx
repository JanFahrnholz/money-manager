import { Props } from "next/script";
import { createContext, FC, useEffect, useState } from "react";
import usePersistentState from "../hooks/usePersistentStorage";

type ContextProps = {
    currentTab: number;
    setCurrentTab: (tab: number) => void;
};

export const NavigationContext = createContext<ContextProps>(undefined!);

const NavigationContextProvider: FC<Props> = (props) => {
    const [currentTab, setCurrentTab] = usePersistentState("mm_last_tab", 1);

    return (
        <NavigationContext.Provider value={{ currentTab, setCurrentTab }}>
            {props.children}
        </NavigationContext.Provider>
    );
};

export default NavigationContextProvider;
