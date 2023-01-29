import { Typography } from "@mui/material";
import { FC } from "react";
import useLoggedIn from "../../hooks/useLoggedIn";
import AppVersion from "./AppVersion";

const Watermark: FC = () => {
    const loggedIn = useLoggedIn();

    if (!loggedIn) return <></>;

    return (
        <>
            <Typography>
                MoneyManager <AppVersion />
                <br />© 2022 Industed - All rights resevered
            </Typography>
        </>
    );
};

export default Watermark;
