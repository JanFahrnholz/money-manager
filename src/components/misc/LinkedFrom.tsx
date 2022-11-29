import { Typography } from "@mui/material";
import { FC } from "react";
import Contact from "../../types/Contact";
import Record from "../../types/Record";

type Props = {
    txt: string;
};

const LinkedFrom: FC<Props> = ({ txt }) => {
    return (
        <>
            <Typography
                sx={{
                    color: "text.secondary",
                    display: "inline",
                }}
            >
                linked from{" "}
            </Typography>
            <Typography
                sx={{
                    display: "inline",
                    color: "white",
                }}
            >
                {/* {contact.expand.owner.username} */}
                {txt}
            </Typography>
        </>
    );
};

export default LinkedFrom;
