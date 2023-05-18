import { FormControl, OutlinedInput, Paper } from "@mui/material";
import Chat from "features/chats/types/chat";
import { FC, KeyboardEvent, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import useChat from "features/chats/hooks/useChat";

interface ChatInputProps {}

const ChatInput: FC<ChatInputProps> = ({}) => {
    const { send, chat } = useChat();
    const [message, setMessage] = useState("");

    const sendMessage = async () => {
        try {
            await send(message);
            setMessage("");
        } catch (error) {}
    };

    const handleKeydown = (event: KeyboardEvent) => {
        if (event.code === "Enter") sendMessage();
    };

    return (
        <FormControl variant="filled" fullWidth>
            <OutlinedInput
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onClick={() => sendMessage()}
                onKeyDown={(e) => handleKeydown(e)}
                placeholder="message..."
                endAdornment={<SendIcon onClick={() => sendMessage()} />}
            />

            {/* <FormHelperText id="outlined-weight-helper-text">
        Weight
    </FormHelperText> */}
        </FormControl>
    );
};

export default ChatInput;
