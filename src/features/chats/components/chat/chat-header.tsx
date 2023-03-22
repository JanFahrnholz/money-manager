import { Paper, Typography } from "@mui/material";
import Chat from "features/chats/types/chat";
import Username from "features/user-profiles/components/username";
import { userId } from "lib/Pocketbase";
import { FC, Fragment } from "react";

interface ChatHeaderProps {
    chat: Chat;
}

const ChatHeader: FC<ChatHeaderProps> = ({ chat }) => {
    if (!userId) return <></>;

    const participants = chat.participants.filter(
        (participant) => participant != userId
    );

    return (
        <Paper
            elevation={0}
            sx={{
                p: 1,
                textAlign: "center",
                backgroundColor: "background.paper",
                top: 0,
            }}
        >
            <Typography>
                chat with{" "}
                {participants.map((p) => (
                    <Fragment key={p}>
                        <Username id={p} key={p} />{" "}
                    </Fragment>
                ))}
            </Typography>
        </Paper>
    );
};

export default ChatHeader;
