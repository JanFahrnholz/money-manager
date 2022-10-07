import { Account, Client, Models } from "appwrite";
import { Props } from "next/script";
import { createContext, FC, useContext, useEffect, useState } from "react";

interface ContextType {
    user: Models.Account<{}> | undefined;
    session: Models.Session | undefined;
    sync: Function;
    useSync: Function;
    getPreferences: (key: string) => any;
    login: Function;
    loginGoogle: Function;
    register: Function;
    logout: Function;
}

export const UserContext = createContext<ContextType>(undefined!);

const UserContextProvider: FC<Props> = (props) => {
    const [user, setUser] = useState<Models.Account<{}> | undefined>(undefined);
    const [session, setSession] = useState<Models.Session | undefined>(
        undefined
    );

    const client = new Client()
        .setEndpoint(process.env.AW_URL || "") // Your API Endpoint
        .setProject(process.env.AW_PROJECT || ""); // Your project ID

    const account = new Account(client);

    console.log(user, session);

    useEffect(() => {
        const setData = async () => {
            try {
                const user = await account.get();
                setUser(user);
                const cs = await account.getPrefs();
                if (typeof cs.cloudSync != "boolean") sync("cloudSync", false);
            } catch (e) {
                setUser(undefined);
            }
        };
        setData();
    }, [session]);

    const getPreferences = async (key?: string) => {
        const prefs = await account.getPrefs();

        return key ? prefs[key] : prefs;
    };

    const sync = async (key: string, data: any) => {
        const prefs = await account.getPrefs();

        prefs[key] = data;

        await account.updatePrefs(prefs);
    };
    const useSync = (key: string, data: any) => {
        const [state, setInternalState] = useState(data);

        useEffect(() => {
            const syncInternal = async () => {
                try {
                    const pref = await getPreferences(key);
                    if (pref === undefined) return;
                    setInternalState(pref);
                } catch (e) {}
            };
            syncInternal();
        }, [user, session]);

        const setState = (value: any) => {
            setInternalState(value);
            console.log(
                "🚀 ~ file: UserContext.tsx ~ line 77 ~ setState ~ value",
                value
            );
            sync(key, value);
        };

        const getState = async () => {
            return await getPreferences(key);
        };

        return [state, setState, getState];
    };

    const login = async (email: string, password: string) => {
        try {
            const res = await account.createEmailSession(email, password);
            setSession(res);
            return false;
        } catch (e) {
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

        console.log(res);
    };

    const register = async (name: string, email: string, password: string) => {
        try {
            const res = await account.create("unique()", email, password, name);

            setUser(res);

            await login(email, password);
            return false;
        } catch (e) {
            return e.message;
        }
    };

    const logout = () => {
        account.deleteSession("current").then(() => setSession(undefined));
    };

    return (
        <UserContext.Provider
            value={{
                user,
                session,
                sync,
                useSync,
                getPreferences,
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
