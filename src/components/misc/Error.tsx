import { Alert } from "@mui/material";
import { FC } from "react";

const Error: FC<{ error: false | undefined | null | string }> = ({ error }) => {
    return (
        <>
            {typeof error == "string" && (
                <Alert className="m-2" severity="error" variant="filled">
                    {error}
                </Alert>
            )}
        </>
    );
};

export default Error;
