import { Typography, Button } from "@mui/material";
import { FC, useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { ProfileContext } from "../context";
import useCreate from "../hooks/useCreate";
import create from "../hooks/useCreate";
import useProfile from "../hooks/useProfile";

const CreateProfile: FC = () => {
    const profile = useProfile();
    const [loading, setLoading] = useState(false);
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
