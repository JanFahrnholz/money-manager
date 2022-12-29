import { TextField } from "@mui/material";
import useCopyToClipboard from "hooks/useCopyToClipboard";
import { client } from "lib/Pocketbase";
import { FC } from "react";

const UserIdCopy: FC = () => {
	const id = client.authStore.model?.id;
	const [text, copy] = useCopyToClipboard();

	return (
		<TextField
			value={id}
			size="small"
			label="Your user ID"
			onFocus={() => copy(id || "")}
		/>
	);
};

export default UserIdCopy;
