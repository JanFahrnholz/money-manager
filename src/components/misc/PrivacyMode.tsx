import { PrivacyModeContext } from "context/PrivacyModeContext";
import usePersistentState from "hooks/usePersistentStorage";
import { FC, ReactNode, useContext } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { css } from "@emotion/react";

type Props = {
	children: ReactNode;
};

const PrivacyMode: FC<Props> = ({ children }) => {
	const { active } = useContext(PrivacyModeContext);

	if (active)
		return (
			<div className="flex justify-center">
				<VisibilityOffIcon fontSize="small" sx={{ m: 0, p: 0 }} />
			</div>
		);

	return <>{children}</>;
};

export default PrivacyMode;
