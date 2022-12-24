import { Fab } from "@mui/material";
import { FC } from "react";

const PrivacyModeToggle: FC = () => {
	return (
		<>
			<Fab color="primary" aria-label="add">
				<AddIcon />
			</Fab>
		</>
	);
};
