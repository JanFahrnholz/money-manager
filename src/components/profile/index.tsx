import { Avatar, Button, Divider, Typography } from "@mui/material";
import useUser from "hooks/useUser";
import { FC } from "react";
import { client } from "../../lib/Pocketbase";
import AppVersion from "../misc/AppVersion";
import DeleteIdButton from "../misc/DeleteIdButton";
import UserIdCopy from "../misc/UserIdCopy";

const Profile: FC = () => {
	const user = useUser();

	return (
		<div className="p-2">
			<div className="text-center">
				<div className="my-6">
					<Avatar
						sx={{
							mx: "auto",
							width: 128,
							height: 128,
							backgroundColor: "primary.main",
						}}
					></Avatar>
				</div>

				<div>
					<UserIdCopy />
				</div>
			</div>

			<div className="my-4">
				<Divider sx={{ color: "text.secondary" }}>Your profile</Divider>
			</div>

			<div className="text-center text-sm">
				<Typography
					sx={{ color: "text.secondary", fontSize: 14, mb: 2 }}
				>
					You are completely anonymous, no public profile
				</Typography>
				<Button variant="outlined">Create profile</Button>
			</div>

			<div className="fixed bottom-8 left-1/2 mb-14 center-anchor text-dark-700 z-0 w-3/4 text-center">
				MoneyManager <AppVersion />
				<br />© 2022 Industed - All rights resevered
			</div>
		</div>
	);
};

export default Profile;
