import { Button, TextField } from "@mui/material";
import useCopyToClipboard from "hooks/useCopyToClipboard";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { client } from "lib/Pocketbase";
import { FC } from "react";
import { toast } from "react-hot-toast";

const UserIdCopy: FC = () => {
    const id = client.authStore.model?.id;
    const [text, copy] = useCopyToClipboard();

    const doCopy = () => {
        copy(id || "");
    };

    return (
        <>
            <TextField
                value={id}
                size="small"
                label="Your user ID"
                onFocus={() => doCopy()}
            />
            <span className="text-gray-300" onClick={() => doCopy()}>
                <ContentCopyIcon sx={{ m: 1 }} />
            </span>
        </>
    );
};

export default UserIdCopy;
