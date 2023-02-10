import { Typography } from "@mui/material";
import { FC } from "react";
import useLoggedIn from "../../hooks/useLoggedIn";
import AppVersion from "./AppVersion";

const Watermark: FC = () => {
    const loggedIn = useLoggedIn();

    if (!loggedIn) return <></>;

    return (
        <>
            <Typography
                sx={{
                    color: "text.secondary",
                    textAlign: "center",
                    mt: 4,
                    pb: 14,
                }}
            >
                <span className="text-dark-700">
                    MoneyManager <AppVersion />
                    <br />© 2022 Industed - All rights resevered
                </span>
            </Typography>
        </>
    );
};

export default Watermark;
