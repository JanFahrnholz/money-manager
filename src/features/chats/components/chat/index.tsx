import RenderInterval from "@/components/misc/RenderInterval";
import { Container, Divider, Grid, Typography } from "@mui/material";
import useChat from "features/chats/hooks/useChat";
import { formatDailyDate } from "lib/Formatter";
import { FC } from "react";
import ChatHeader from "./chat-header";
import ChatInput from "./chat-input";
import ChatMessageComponent from "./chat-message";

interface ChatProps {
    id: string;
}

const ChatComponent: FC<ChatProps> = ({ id }) => {
    const { chat } = useChat(id);
    if (!chat) return <>chat not available</>;

    return (
        <Container sx={{ p: 0 }}>
            <Grid container>
                <Grid item xs={12}>
                    <ChatHeader chat={chat} />
                </Grid>
                <Grid item xs={12}>
                    <Container sx={{ p: 0 }}>
                        {chat?.messages.map((message, index, array) => (
                            <>
                                <RenderInterval
                                    index={index}
                                    array={array}
                                    dateIndex="created"
                                    daily={(date) => dayDivider(date)}
                                />
                                <ChatMessageComponent
                                    key={message.created.valueOf()}
                                    message={message}
                                />
                            </>
                        ))}
                    </Container>
                </Grid>
                <Grid item xs={12}>
                    <ChatInput />
                </Grid>
            </Grid>
        </Container>
    );
};

export default ChatComponent;

const dayDivider = (date: Date) => (
    <Divider
        sx={{
            mx: "auto",
            p: 1,
        }}
    >
        <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
            {formatDailyDate(date)}
        </Typography>
    </Divider>
);
