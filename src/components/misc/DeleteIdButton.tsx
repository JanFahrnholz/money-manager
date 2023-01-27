import { Button } from "@mui/material";
import { client, deleteId } from "lib/Pocketbase";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { useCopyToClipboard } from "usehooks-ts";
import ConfirmationDialog from "./ConfirmationDialog";

interface Props {
	text?: string;
}

const DeleteIdButton: FC<Props> = ({ text }) => {
	const id = client.authStore.model?.id;
	const [open, setOpen] = useState(false);

	const router = useRouter();
	const logout = () => {
		client.authStore.clear();
	};

	const del = async () => {
		if (!id) return;
		deleteId(id);
		logout();
	};

	return (
		<>
			<ConfirmationDialog
				open={open}
				setOpen={setOpen}
				title="Delete your ID"
				content={
					"This will also delete all data associated with your ID. This action cannot be undone"
				}
				disagreeText="Cancel"
				agreeText="Delete"
				action={() => del()}
			/>
			<Button
				fullWidth
				variant="outlined"
				color="error"
				onClick={() => setOpen(true)}
			>
				{text ? text : "Delete ID"}
			</Button>
		</>
	);
};

export default DeleteIdButton;
