import { createTheme, ThemeProvider } from "@mui/material";
import PrivacyModeContextProvider from "context/PrivacyModeContext";
import useOnVersionChange from "hooks/useOnVersionChange";
import type { AppProps } from "next/app";
import Head from "next/head";
import toast from "react-hot-toast";
import ContactContextProvider from "../context/ContactContext";
import NavigationContextProvider from "../context/NavigationContext";
import TransactionContextProvider from "../context/TransactionContext";
import "../styles/globals.css";

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
			default: "#282828",
			paper: "#424242",
		},
	},
});

function MyApp({ Component, pageProps }: AppProps) {
	useOnVersionChange((version) => {
		toast.loading(`Updating to version ${version}`);
	});
	return (
		<ThemeProvider theme={theme}>
			<NavigationContextProvider>
				<TransactionContextProvider>
					<ContactContextProvider>
						<PrivacyModeContextProvider>
							<Head>
								<meta
									name="viewport"
									content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
								/>
								<meta
									httpEquiv="ScreenOrientation"
									content="autoRotate:disabled"
								/>
								<title>Money Manager</title>
							</Head>
							<Component {...pageProps} />
						</PrivacyModeContextProvider>
					</ContactContextProvider>
				</TransactionContextProvider>
			</NavigationContextProvider>
		</ThemeProvider>
	);
}

export default MyApp;
