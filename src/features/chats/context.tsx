import {
    createContext,
    Dispatch,
    FC,
    ReactNode,
    SetStateAction,
    useState,
} from "react";
import Chat from "./types/chat";

type ContextProps = {
    chat: Chat | undefined;
    setChat: Dispatch<SetStateAction<Chat | undefined>>;
};

export const ChatContext = createContext<ContextProps>(undefined!);

const ChatContextProvider: FC<{ children?: ReactNode }> = ({ children }) => {
    const [chat, setChat] = useState<Chat | undefined>();

    return (
        <ChatContext.Provider
            value={{
                chat,
                setChat,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

export default ChatContextProvider;
