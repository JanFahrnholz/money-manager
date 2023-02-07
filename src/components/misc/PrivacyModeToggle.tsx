import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Fab } from "@mui/material";
import { PrivacyModeContext } from "context/PrivacyModeContext";
import useProfile from "features/user-profiles/hooks/useProfile";
import useLoggedIn from "hooks/useLoggedIn";
import { FC, useContext } from "react";

const PrivacyModeToggle: FC = () => {
    const { active, toggle } = useContext(PrivacyModeContext);
    const { profile } = useProfile();
    const loggedIn = useLoggedIn();

    if (!profile?.seller) return <></>;

    return (
        <>
            {loggedIn && (
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
            )}
        </>
    );
};

export default PrivacyModeToggle;
