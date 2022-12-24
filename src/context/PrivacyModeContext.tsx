import { Props } from "next/script";
import { createContext, FC, useEffect, useState } from "react";
import usePersistentState from "../hooks/usePersistentStorage";

type ContextProps = {
	active: boolean;
	setActive: (value: boolean) => void;
	toggle: () => void;
};
export const PrivacyModeContext = createContext<ContextProps>(undefined!);

const PrivacyModeContextProvider: FC<Props> = (props) => {
	const [active, setActive] = usePersistentState("mm_privacy_mode", false);

	const toggle = () => setActive(!active);

	return (
		<PrivacyModeContext.Provider
			value={{
				active,
				setActive,
				toggle,
			}}
		>
			{props.children}
		</PrivacyModeContext.Provider>
	);
};

export default PrivacyModeContextProvider;
