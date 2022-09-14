import "../styles/globals.css";
import type { AppProps } from "next/app";
import TransactionContextProvider from "../context/TransactionContext";
import ContactContextProvider from "../context/ContactContext";
import ProfileContextProvider from "../context/ProfileContext";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: "#ffd600",
            contrastText: "#303030",
        },
        secondary: {
            main: "#313131",
            contrastText: "#ffffff",
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
