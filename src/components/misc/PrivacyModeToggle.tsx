import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Fab } from "@mui/material";
import { PrivacyModeContext } from "context/PrivacyModeContext";
import { FC, useContext } from "react";

const PrivacyModeToggle: FC = () => {
	const { active, toggle } = useContext(PrivacyModeContext);

	return (
		<>
			<Fab
				color="primary"
				onClick={() => toggle()}
				sx={{
					position: "fixed",
					borderTopLeftRadius: 0,
					height: "40px",
					width: "40px",
					borderBottomLeftRadius: 0,
					bottom: "10%",
				}}
			>
				{!active ? (
					<VisibilityIcon fontSize="small" />
				) : (
					<VisibilityOffIcon fontSize="small" />
				)}
			</Fab>
		</>
	);
};

export default PrivacyModeToggle;
