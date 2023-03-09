import { ListItem, Stack, Typography } from "@mui/material";
import ChatMessage from "features/chats/types/chat-message";
import ProfileAvatar from "features/user-profiles/components/avatar";
import { userId } from "lib/Pocketbase";
import { FC } from "react";

const getTime = (dateString: string) =>
    new Date(dateString).toLocaleTimeString("de-De", {
        hour: "2-digit",
        minute: "2-digit",
    });

interface ChatMessageProps {
    message: ChatMessage;
}

const ChatMessageComponent: FC<ChatMessageProps> = ({ message }) => {
    console.log("🚀 ~ file: chat-message.tsx:33 ~ message:", message);
    if (userId === message.user) return <ChatMessageOwned message={message} />;

    return (
        <ListItem
            sx={{
                mb: 1,
                width: "75%",
            }}
            disablePadding
        >
            <Stack
                direction="row"
                sx={{
                    backgroundColor: "secondary.main",
                    borderRadius: 5,
                    alignItems: "center",
                }}
            >
                <div style={{ alignSelf: "flex-start" }}>
                    <ProfileAvatar id={message.user} />
                </div>
                <Typography sx={{ p: 1, px: 2 }}>{message.content}</Typography>
            </Stack>
            <Typography sx={{ ml: 1, color: "text.secondary" }}>
                {getTime(message.created)}
            </Typography>
        </ListItem>
    );
};

export default ChatMessageComponent;

const ChatMessageOwned: FC<ChatMessageProps> = ({ message }) => {
    return (
        <ListItem
            sx={{
                mb: 1,
                p: 0,
                width: "75%",
                float: "right",
                justifyContent: "flex-end",
            }}
        >
            <Typography sx={{ mr: 1, color: "text.secondary" }}>
                {getTime(message.created)}
            </Typography>
            <Stack
                direction="row"
                sx={{
                    backgroundColor: "secondary.main",
                    borderRadius: 5,
                    alignItems: "center",
                }}
            >
                <Typography sx={{ p: 1, px: 2 }}>{message.content}</Typography>
                <div style={{ alignSelf: "flex-start" }}>
                    <ProfileAvatar />
                </div>
            </Stack>
        </ListItem>
    );
};
