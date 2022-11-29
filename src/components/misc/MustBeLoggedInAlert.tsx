import { Alert } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { client } from "../../lib/Pocketbase";
import { useRouter } from "next/router";
import useLoggedIn from "../../hooks/useLoggedIn";

type Props = {
    msg: string;
};

const MustBeLoggedInAlert: FC<Props> = ({ msg }) => {
    const user = useLoggedIn();
    const router = useRouter();

    return (
        <>
            {!user && (
                <Alert
                    className="m-2"
                    severity="info"
                    variant="outlined"
                    onClick={() => router.push("/login")}
                >
                    {msg}
                </Alert>
            )}
        </>
    );
};

export default MustBeLoggedInAlert;
