import { FC } from "react";
import { AddToHomeScreen } from "react-pwa-add-to-homescreen";

const StyledAddToHomescreen: FC = () => {
    return (
        <AddToHomeScreen
            delayNotify={2000}
            skipFirstVisit={false}
            translate={{
                headline: "Install the app on your homescreen",
                chromiumInstall: " ",
            }}
            styles={{
                body: {
                    background:
                        "linear-gradient(0deg, rgba(0,0,0,0.8) 70%, rgba(255,255,255,0) 100%)",
                    zIndex: "2000",
                    paddingTop: "50px",
                    border: "none",
                    color: "#fff",
                },
                heading: { color: "#fff" },
                button: {
                    background: "#ffd600",
                    color: "#000",
                    marginBottom: "30px",
                },
            }}
        />
    );
};

export default StyledAddToHomescreen;
