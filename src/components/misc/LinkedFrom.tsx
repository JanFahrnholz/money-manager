import { Typography } from "@mui/material";
import useProfile from "features/user-profiles/hooks/useProfile";
import { FC, useEffect, useState } from "react";
import Contact from "../../types/Contact";
import Record from "../../types/Record";

type Props = {
    owner: string;
};

const LinkedFrom: FC<Props> = ({ owner }) => {
    const [txt, setTxt] = useState(owner);
    const { get } = useProfile();

    const setUsername = async () => {
        try {
            const p = await get(owner);
            console.log("fetched", p);
            if (!p.username) return;
            if (p.username === "") return;
            setTxt(p.username);
        } catch (error) {}
    };

    useEffect(() => {
        setUsername();
    });
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
