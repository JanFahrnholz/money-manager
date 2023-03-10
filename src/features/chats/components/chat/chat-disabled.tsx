import { Backdrop, Button, Paper, Stack, Typography } from "@mui/material";
import { textAlign } from "@mui/system";
import useUser from "features/user-settings/hooks/useUser";
import { FC } from "react";
import toast from "react-hot-toast";

interface ChatDeactivatedProps {}

const ChatDisabled: FC<ChatDeactivatedProps> = () => {
    const { user, update } = useUser();

    const activateChats = async () => {
        try {
            await update({ id: user?.id, enableChats: true });
        } catch (e) {}
    };

    return (
        <>
            <Stack
                sx={{
                    position: "absolute",
                    zIndex: 1500,

                    height: "75vh",
                    width: "100%",
                }}
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
            >
                <div>
                    <Typography sx={{ mb: 1, textAlign: "center" }}>
                        chats deactivated
                    </Typography>
                    <Button variant="contained" onClick={() => activateChats()}>
                        Activate chats
                    </Button>
                </div>
            </Stack>
        </>
    );
};

export default ChatDisabled;
