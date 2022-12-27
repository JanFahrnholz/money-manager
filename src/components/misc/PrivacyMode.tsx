import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { PrivacyModeContext } from "context/PrivacyModeContext";
import { FC, ReactNode, useContext } from "react";

type Props = {
	children: ReactNode;
	disableIcon?: boolean;
	disableCenter?: boolean;
};

const PrivacyMode: FC<Props> = ({ children, disableIcon, disableCenter }) => {
	const { active } = useContext(PrivacyModeContext);

	if (active && disableIcon) return <></>;

	if (active)
		return (
			<span className="inline align-middle">
				{/* <div className={`flex ${!disableCenter && "justify-center"}`}> */}
				<VisibilityOffIcon fontSize="small" sx={{ m: 0, p: 0 }} />
				{/* </div> */}
			</span>
		);

	return <>{children}</>;
};

export default PrivacyMode;
