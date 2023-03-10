import RenderInterval from "@/components/misc/RenderInterval";
import { Container, Divider, Grid, Stack, Typography } from "@mui/material";
import useChat from "features/chats/hooks/useChat";
import useSetting from "features/user-settings/hooks/useSetting";
import { formatDailyDate } from "lib/Formatter";
import { FC } from "react";
import ChatDisabled from "./chat-disabled";
import ChatHeader from "./chat-header";
import ChatInput from "./chat-input";
import ChatMessageComponent from "./chat-message";
import ChatMessages from "./chat-messages";

interface ChatProps {
    id: string;
}

const ChatComponent: FC<ChatProps> = ({ id }) => {
    const { chat } = useChat(id);

    const enabled = useSetting("enableChats");
    if (!chat) return <>chat not available</>;

    return (
        <>
            {!enabled && <ChatDisabled />}
            <Container
                sx={{
                    p: 1,
                    borderColor: "secondary.main",
                    borderWidth: "1",
                    borderStyle: "solid",
                    borderRadius: 2,
                    filter: enabled ? "" : "blur(5px)",
                    background: enabled ? "" : "rgba(0,0,0,0.3)",
                }}
            >
                <Stack>
                    <ChatHeader chat={chat} />
                    <ChatMessages chat={chat} />
                    <ChatInput />
                </Stack>
            </Container>
        </>
    );
};

export default ChatComponent;
