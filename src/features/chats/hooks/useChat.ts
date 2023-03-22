import { client, userId as myUserId, userId } from "lib/Pocketbase";
import { useContext, useEffect } from "react";
import { ChatContext } from "../context";
import Chat from "../types/chat";

const useChat = (chatId?: string) => {
    const { chat, setChat, use } = useContext(ChatContext);

    const create = async (userId: string) => {
        try {
            const chat = await client.collection("chats").create<Chat>({
                participants: [myUserId, userId],
                messages: [],
            });
            setChat(chat);
            return chat;
        } catch (error) {
            throw new Error("could not create chat");
        }
    };

    const remove = async (chatId: string) => {
        try {
            await client.collection("chats").delete(chatId);
        } catch (error: any) {
            throw new Error(error.message);
        }
    };

    const send = async (content: string) => {
        if (!chat) throw new Error("no chat in use");
        if (content.trim() === "") return;

        const message = {
            content,
            created: new Date(),
            user: userId || "",
        };

        try {
            const newChat = await client
                .collection("chats")
                .update(chat.id, { messages: [...chat.messages, message] });

            setChat(newChat as Chat);
        } catch (error: any) {
            throw new Error(error.message);
        }
    };

    useEffect(() => {
        if (chatId) use(chatId);
    }, [chatId]);

    return { chat, create, use, remove, send };
};

export default useChat;
