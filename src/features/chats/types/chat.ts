import User from "@/types/User";
import { Record } from "pocketbase";
import ChatMessage from "./chat-message";

type Chat = Record & {
    participants: string[];
    messages: ChatMessage[];
};

export default Chat;
