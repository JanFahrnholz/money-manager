import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Button, Fab } from "@mui/material";
import { PrivacyModeContext } from "context/PrivacyModeContext";
import { FC, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useToggle } from "usehooks-ts";
import useLoggedIn from "hooks/useLoggedIn";

const PrivacyModeToggle: FC = () => {
	const { active, toggle } = useContext(PrivacyModeContext);

	return (
		<>
			<AnimatePresence>
				{useLoggedIn() && (
					<motion.div
						transition={{ duration: 1 }}
						style={{
							position: "fixed",
							bottom: "90rem",
						}}
						initial={{
							x: -50,
						}}
						animate={{
							x: 0,
						}}
						exit={{ x: -50 }}
					>
						<Fab
							color="primary"
							onClick={() => toggle()}
							sx={{
								position: "fixed",
								borderTopLeftRadius: 0,
								height: "40px",
								width: "40px",
								bottom: 90,
								borderBottomLeftRadius: 0,
							}}
						>
							{!active ? (
								<VisibilityIcon fontSize="small" />
							) : (
								<VisibilityOffIcon fontSize="small" />
							)}
						</Fab>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};

export default PrivacyModeToggle;
