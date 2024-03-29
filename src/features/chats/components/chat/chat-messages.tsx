import RenderInterval from "@/components/misc/RenderInterval";
import { Container, Divider, Typography } from "@mui/material";
import Chat from "features/chats/types/chat";
import useSetting from "features/user-settings/hooks/useSetting";
import { formatDailyDate } from "lib/Formatter";
import { FC, Fragment, useEffect, useRef } from "react";
import ChatMessageComponent from "./chat-message";

interface ChatMessagesProps {
    chat: Chat;
}

const ChatMessages: FC<ChatMessagesProps> = ({ chat }) => {
    const enabled = useSetting("enableChats");
    const ref = useRef<any>(null);
    const windowBleeding = 350;

    useEffect(() => {
        // Scroll to the bottom of the message list when a new message is added
        if (ref.current) {
            ref.current.scrollTop = ref.current.scrollHeight;
        }
    }, [chat.messages]);

    return (
        <Container
            ref={ref}
            sx={{
                p: 0,
                overflow: enabled ? "scroll" : "hidden",
                maxHeight: `${window.innerHeight - windowBleeding}px`,
                height: "80vh",
            }}
        >
            {chat?.messages.map((message, index, array) => (
                <Fragment key={message.created.valueOf()}>
                    <RenderInterval
                        index={index}
                        array={array}
                        dateIndex="created"
                        daily={(date) => dayDivider(date)}
                    />
                    <ChatMessageComponent message={message} />
                </Fragment>
            ))}
        </Container>
    );
};

export default ChatMessages;

const dayDivider = (date: Date) => (
    <Divider
        sx={{
            mx: "auto",
            width: "100%",
            p: 1,
        }}
    >
        <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
            {formatDailyDate(date)}
        </Typography>
    </Divider>
);
