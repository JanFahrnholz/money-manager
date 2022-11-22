import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createTheme, ThemeProvider } from "@mui/material";
import Head from "next/head";
import { Client, Account, ID } from "appwrite";
import ContactContextProvider from "../context/ContactContext";
import TransactionContextProvider from "../context/TransactionContext";

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
            secondary: "#ccc",
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
            <TransactionContextProvider>
                <ContactContextProvider>
                    <Head>
                        <meta
                            name="viewport"
                            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
                        />
                        <title>Money Manager</title>
                    </Head>
                    <Component {...pageProps} />
                </ContactContextProvider>
            </TransactionContextProvider>
        </ThemeProvider>
    );
}

export default MyApp;
