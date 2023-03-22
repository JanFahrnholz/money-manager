import { Button, Typography } from "@mui/material";
import { FC, useState } from "react";
import useCreate from "../hooks/useCreate";
import useProfile from "../hooks/useProfile";

const CreateProfile: FC = () => {
    const profile = useProfile();
    const create = useCreate();

    if (profile) return <></>;

    return (
        <>
            <div className="text-center text-sm">
                <Typography
                    sx={{ color: "text.secondary", fontSize: 14, mb: 2 }}
                >
                    You are completely anonymous, no public profile
                </Typography>
                <Button variant="outlined" onClick={() => create()}>
                    Create profile
                </Button>
            </div>
        </>
    );
};

export default CreateProfile;
