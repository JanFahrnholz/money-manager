import type { NextPage } from "next";
import Navigation from "../components/Navigation";
import People from "../components/people";
import Profile from "../components/profile";
import Tools from "../components/tools";
import Transactions from "../components/transactions";
import { AddToHomeScreen } from "react-pwa-add-to-homescreen";
import { motion, AnimatePresence } from "framer-motion";

const Home: NextPage = () => {
    return (
        <>
            <Navigation
                tabs={[
                    <Transactions key={0} />,
                    <People key={1} />,
                    <Tools key={2} />,
                    <Profile key={3} />,
                ]}
            />

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
                        zIndex: "500",
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
        </>
    );
};

export default Home;
