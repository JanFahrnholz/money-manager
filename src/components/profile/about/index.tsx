import { Link, Typography } from "@mui/material";
import { FC } from "react";
import AppVersion from "../../misc/AppVersion";

const AboutSection: FC = () => {
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
