import { Paper, Typography } from "@mui/material";
import Chat from "features/chats/types/chat";
import Username from "features/user-profiles/components/username";
import useProfile from "features/user-profiles/hooks/useProfile";
import { userId } from "lib/Pocketbase";
import { FC } from "react";

interface ChatHeaderProps {
    chat: Chat;
}

const ChatHeader: FC<ChatHeaderProps> = ({ chat }) => {
    const { get } = useProfile();
    if (!userId) return <></>;

    const participants = chat.participants.filter(
        (participant) => participant != userId
    );

    return (
        <Paper
            elevation={0}
            sx={{
                mb: 2,
                p: 1,
                textAlign: "center",
                backgroundColor: "background.paper",
            }}
        >
            <Typography>
                chat with{" "}
                {participants.map((p) => (
                    <>
                        <Username id={p} key={p} />{" "}
                    </>
                ))}
            </Typography>
        </Paper>
    );
};

export default ChatHeader;
