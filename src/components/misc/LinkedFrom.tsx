import { Typography } from "@mui/material";
import useProfile from "features/user-profiles/hooks/useProfile";
import { FC, useEffect, useState } from "react";
import Contact from "../../types/Contact";
import Record from "../../types/Record";

type Props = {
    owner: string;
    asText?: boolean;
    disableId?: boolean;
};

const LinkedFrom: FC<Props> = ({ owner, asText, disableId }) => {
    const [txt, setTxt] = useState(disableId ? "" : owner);
    const { get } = useProfile();

    const setUsername = async () => {
        try {
            const p = await get(owner);
            if (!p.username) return;
            if (p.username === "") return;
            setTxt(p.username);
        } catch (error) {}
    };

    useEffect(() => {
        setUsername();
    });
    if (asText) return <>{txt}</>;
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
