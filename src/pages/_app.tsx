import "../styles/globals.css";
import type { AppProps } from "next/app";
import TransactionContextProvider from "../context/TransactionContext";
import ContactContextProvider from "../context/ContactContext";
import ProfileContextProvider from "../context/ProfileContext";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#ffd600",
            light: "#ffff52",
            dark: "#c7a500",
            contrastText: "#000",
        },
        secondary: {
            main: "#313131",
            light: "#5a5a5a",
            dark: "#080808",
            contrastText: "#ffffff",
        },
        text: {
            primary: "#fff",
        },
        background: {
            default: "#303030",
            paper: "#424242",
        },
    },
});

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider theme={theme}>
            <ContactContextProvider>
                <TransactionContextProvider>
                    <ProfileContextProvider>
                        <Component {...pageProps} />
                    </ProfileContextProvider>
                </TransactionContextProvider>
            </ContactContextProvider>
        </ThemeProvider>
    );
}

export default MyApp;
