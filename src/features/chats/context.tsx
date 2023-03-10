import { client } from "lib/Pocketbase";
import {
    createContext,
    Dispatch,
    FC,
    ReactNode,
    SetStateAction,
    useEffect,
    useState,
} from "react";
import Chat from "./types/chat";

type ContextProps = {
    chat: Chat | undefined;
    setChat: Dispatch<SetStateAction<Chat | undefined>>;
    use: (chatId: string) => Promise<Chat | undefined>;
};

export const ChatContext = createContext<ContextProps>(undefined!);

const ChatContextProvider: FC<{ children?: ReactNode }> = ({ children }) => {
    const [chat, setChat] = useState<Chat | undefined>();

    const use = async (chatId: string) => {
        try {
            const newChat = await client
                .collection("chats")
                .getOne<Chat>(chatId);
            setChat(newChat);
            return newChat;
        } catch (error: any) {
            setChat(undefined);
        }
    };
    useEffect(() => {
        if (!chat) return;

        client.collection("chats").subscribe<Chat>(chat.id, () => use(chat.id));
    }, [chat]);
    return (
        <ChatContext.Provider
            value={{
                chat,
                setChat,
                use,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

export default ChatContextProvider;
