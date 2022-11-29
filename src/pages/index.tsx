import type { GetStaticProps, NextPage } from "next";
import Navigation from "../components/Navigation";
import People from "../components/contacts";
import Profile from "../components/profile";
import Tools from "../components/tools";
import Transactions from "../components/transactions";
import StyledAddToHomescreen from "../components/misc/StyledAddToHomescreen";
import { client } from "../lib/Pocketbase";
import Landingscreen from "../components/Landingscreen";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useLoggedIn from "../hooks/useLoggedIn";

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

            <Navigation
                tabs={[
                    <Transactions key={0} />,
                    <People key={1} />,
                    <Profile key={3} />,
                ]}
            />

            <StyledAddToHomescreen />
        </>
    );
};

export default Home;
