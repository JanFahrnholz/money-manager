import { AnimatePresence, motion } from "framer-motion";
import type { NextPage } from "next";
import { Toaster } from "react-hot-toast";
import People from "../components/contacts";
import Landingscreen from "../components/Landingscreen";
import StyledAddToHomescreen from "../components/misc/StyledAddToHomescreen";
import Navigation from "../components/Navigation";
import Profile from "../components/profile";
import Transactions from "../components/transactions";
import useLoggedIn from "../hooks/useLoggedIn";
import OfflineWarning from "../components/misc/OfflineWarning";
import PrivacyModeToggle from "@/components/misc/PrivacyModeToggle";
import Marketplace from "@/components/marketplace";

const Home: NextPage = () => {
    const loggedIn = useLoggedIn();

    return (
        <>
            <AnimatePresence>
                {!loggedIn && (
                    <motion.div
                        key={"landingscreen-overlay"}
                        style={{
                            position: "fixed",
                            width: "100vw",
                            height: "100vh",
                        }}
                        initial={{ y: "-100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "-100%" }}
                        transition={{ duration: 0.5 }}
                    >
                        <Landingscreen />
                    </motion.div>
                )}
            </AnimatePresence>
            <OfflineWarning />
            <Navigation
                tabs={[
                    <Transactions key={0} />,
                    <People key={1} />,
                    <Marketplace key={2} />,
                    <Profile key={3} />,
                ]}
            />

            <PrivacyModeToggle />

            <StyledAddToHomescreen />
            <Toaster
                toastOptions={{
                    duration: 2000,
                }}
            />
        </>
    );
};

export default Home;
