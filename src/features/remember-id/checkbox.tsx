import { Checkbox, FormControlLabel } from "@mui/material";
import { FC } from "react";
import useRememberId from "./use-remember-id";

const RememberUserIdCheckbox: FC = () => {
	const [id, setId, enabled, setEnabled] = useRememberId();

	return (
		<>
			<FormControlLabel
				label="Remember Id"
				control={
					<Checkbox
						checked={enabled}
						onClick={() => setEnabled(!enabled)}
					/>
				}
			/>
		</>
	);
};

export default RememberUserIdCheckbox;
