import { Account, AppwriteException, Client, Models } from "appwrite";
import { useRouter } from "next/router";
import { Props } from "next/script";
import { createContext, FC, useContext, useEffect, useState } from "react";
import Backup from "../types/Backup";

interface ContextType {
    user: Models.Account<{}> | undefined;
    session: Models.Session | undefined;
    account: Account;
    getPreferences: (key: string | undefined) => any;
    sync: Function;
    syncDisabled: boolean;
    setSyncDisabled: (state: boolean) => void;
    login: Function;
    loginGoogle: Function;
    register: Function;
    logout: Function;
}

export const UserContext = createContext<ContextType>(undefined!);

const UserContextProvider: FC<Props> = (props) => {
    const [syncDisabled, setSyncDisabled] = useState(false);
    const [triggerReload, setReload] = useState(false);
    const [user, setUser] = useState<Models.Account<{}> | undefined>(undefined);
    const [session, setSession] = useState<Models.Session | undefined>(
        undefined
    );

    const router = useRouter();

    const client = new Client()
        .setEndpoint(process.env.AW_URL || "") // Your API Endpoint
        .setProject(process.env.AW_PROJECT || ""); // Your project ID

    const account = new Account(client);

    useEffect(() => {
        const setData = async () => {
            try {
                const user = await account.get();
                setUser(user);
            } catch (e) {
                setUser(undefined);
            }

            try {
                const session = await account.getSession("current");
                setSession(session);
            } catch (e) {
                setSession(undefined);
            }
        };
        setData();
    }, [triggerReload]);

    const reload = () => setReload(!triggerReload);

    const getPreferences = async (key: string | undefined = undefined) => {
        if (!user) return Promise.reject("User not logged in");
        const prefs = await account.getPrefs();

        return key ? prefs[key] : prefs;
    };

    async function sync<T>(key: string, data: T) {
        if (syncDisabled) return Promise.reject("Sync disabled");
        if (!user) return Promise.reject("User not logged in");
        const prefs = await account.getPrefs();

        const backup: Backup<T> = {
            data,
            time: new Date(),
        };

        prefs[key] = backup;

        await account.updatePrefs(prefs);
    }

    const login = async (email: string, password: string) => {
        try {
            const res = await account.createEmailSession(email, password);
            reload();
            return false;
        } catch (e: any) {
            return e.message;
        }
    };

    const loginGoogle = () => {
        const onSuccess =
            process.env.NODE_ENV === "development"
                ? "http://localhost:3000/"
                : "https://mm.industed.com/";
        const onFailure =
            process.env.NODE_ENV === "development"
                ? "http://localhost:3000/login"
                : "https://mm.industed.com/login";

        const res = account.createOAuth2Session("google", onSuccess, onFailure);
    };

    const register = async (name: string, email: string, password: string) => {
        try {
            const res = await account.create("unique()", email, password, name);

            setUser(res);

            await login(email, password);
            return false;
        } catch (e) {}

        reload();
    };

    const logout = (everywhere = false) => {
        account.deleteSession("current").then(() => setSession(undefined));

        if (everywhere)
            account.deleteSessions().then(() => setSession(undefined));

        setSession(undefined);
        setUser(undefined);

        reload();
    };

    return (
        <UserContext.Provider
            value={{
                user,
                session,
                account,
                getPreferences,
                sync,
                syncDisabled,
                setSyncDisabled,
                login,
                loginGoogle,
                register,
                logout,
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
