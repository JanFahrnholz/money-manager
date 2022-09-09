import "../styles/globals.css";
import type { AppProps } from "next/app";
import TransactionContextProvider from "../context/TransactionContext";
import ContactContextProvider from "../context/ContactContext";
import ProfileContextProvider from "../context/ProfileContext";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ContactContextProvider>
            <TransactionContextProvider>
                <ProfileContextProvider>
                    <Component {...pageProps} />
                </ProfileContextProvider>
            </TransactionContextProvider>
        </ContactContextProvider>
    );
}

export default MyApp;
