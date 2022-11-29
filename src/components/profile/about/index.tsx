import { Typography } from "@mui/material";
import { FC } from "react";
import useLoggedIn from "../../../hooks/useLoggedIn";
import AppVersion from "../../misc/AppVersion";

const AboutSection: FC = () => {
    const loggedIn = useLoggedIn();

    if (!loggedIn) return <></>;

    return (
        <>
            <Typography sx={{ color: "text.secondary" }}>
                MoneyManager <AppVersion />
                <br />© 2022 Industed - All rights resevered
            </Typography>
        </>
    );
};

export default AboutSection;
