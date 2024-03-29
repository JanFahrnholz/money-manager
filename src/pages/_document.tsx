import Document, { Html, Head, Main, NextScript } from "next/document";
import TagManager from "react-gtm-module";
import { Toaster } from "react-hot-toast";

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link rel="manifest" href="/manifest.json" />
                    <link
                        rel="apple-touch-icon"
                        href="/icon-512x512.png"
                    ></link>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
