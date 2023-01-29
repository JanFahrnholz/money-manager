import ConfirmationDialog from "@/components/misc/ConfirmationDialog";
import { Button, Typography } from "@mui/material";
import { FC, useState } from "react";
import { toast } from "react-hot-toast";
import useDelete from "../hooks/useDelete";
import useProfile from "../hooks/useProfile";

const DeleteProfile: FC = () => {
    const [open, setOpen] = useState(false);
    const remove = useDelete();
    const { profile } = useProfile();

    if (!profile) return <></>;

    return (
        <>
            <ConfirmationDialog
                open={open}
                setOpen={setOpen}
                title={"Delete profile"}
                content={"Are you sure you want to delete your profile?"}
                agreeText={"Delete"}
                disagreeText={"Cancel"}
                action={remove}
            />
            <div className="text-center text-dark-700">
                <Typography
                    sx={{
                        textDecoration: "underline",
                        mt: 1,
                    }}
                    onClick={() => setOpen(!open)}
                >
                    Delete profile
                </Typography>
            </div>
        </>
    );
};

export default DeleteProfile;
