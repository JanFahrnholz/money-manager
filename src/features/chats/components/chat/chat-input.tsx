import { FormControl, OutlinedInput } from "@mui/material";
import Chat from "features/chats/types/chat";
import { FC, useState } from "react";
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
    return (
        <>
            <FormControl variant="filled" fullWidth>
                <OutlinedInput
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="message..."
                    endAdornment={<SendIcon onClick={() => sendMessage()} />}
                />

                {/* <FormHelperText id="outlined-weight-helper-text">
        Weight
    </FormHelperText> */}
            </FormControl>
        </>
    );
};

export default ChatInput;
