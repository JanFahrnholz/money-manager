import { createTheme, ThemeProvider } from "@mui/material";
import PrivacyModeContextProvider from "context/PrivacyModeContext";
import MarketplaceContextProvider from "features/marketplace/context";
import ProfileContextProvider from "features/user-profiles/context";
import useOnVersionChange from "hooks/useOnVersionChange";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import type { AppProps } from "next/app";
import Head from "next/head";
import toast from "react-hot-toast";
import ContactContextProvider from "../context/ContactContext";
import NavigationContextProvider from "../context/NavigationContext";
import TransactionContextProvider from "../context/TransactionContext";
import "../styles/globals.css";
import TagManager from "react-gtm-module";
import ChatContextProvider from "features/chats/context";

const theme = createTheme({
    palette: {
        mode: "dark",
        error: { main: "#ff1c1c" },
        success: { main: "#62D836" },
        primary: {
            main: "#ffd600",
            light: "#ffff52",
            dark: "#c7a500",
            contrastText: "#000",
        },
        secondary: {
            main: "#313131",
            light: "#5a5a5a",
            dark: "#1F1F1F",
            contrastText: "#ffffff",
        },
        text: {
            primary: "#fff",
            secondary: "#ccc",
        },
        background: {
            default: "#282828",
            paper: "#424242",
        },
    },
});
if (process.browser && process.env.GTM_ID !== undefined) {
    TagManager.initialize({
        gtmId: process.env.GTM_ID,
    });
}

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    TimeAgo.addDefaultLocale(en);
    useOnVersionChange((version) => {
        toast.loading(`Updating to version ${version}`);
    });
    return (
        <ThemeProvider theme={theme}>
            <ProfileContextProvider>
                <MarketplaceContextProvider>
                    <ChatContextProvider>
                        <NavigationContextProvider>
                            <TransactionContextProvider>
                                <ContactContextProvider>
                                    <PrivacyModeContextProvider>
                                        <Head>
                                            <title>Money Manager</title>
                                            <meta
                                                name="viewport"
                                                content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
                                            />
                                            <meta
                                                httpEquiv="ScreenOrientation"
                                                content="autoRotate:disabled"
                                            />
                                            <meta
                                                name="apple-mobile-web-app-capable"
                                                content="yes"
                                            />
                                            <meta
                                                name="apple-mobile-web-app-title"
                                                content="MoneyManager"
                                            />
                                        </Head>
                                        <Component {...pageProps} />
                                    </PrivacyModeContextProvider>
                                </ContactContextProvider>
                            </TransactionContextProvider>
                        </NavigationContextProvider>
                    </ChatContextProvider>
                </MarketplaceContextProvider>
            </ProfileContextProvider>
        </ThemeProvider>
    );
}

export default MyApp;
