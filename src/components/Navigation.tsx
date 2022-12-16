import {
    ReactElement,
    FC,
    useRef,
    useContext,
    useEffect,
    useState,
} from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PeopleIcon from "@mui/icons-material/People";
import Paper from "@mui/material/Paper";
import usePersistantState from "../hooks/usePersistantStorage";
import PercentIcon from "@mui/icons-material/Percent";
import { NavigationContext } from "../context/NavigationContext";
import { AnimatePresence, motion } from "framer-motion";
import { client } from "../lib/Pocketbase";
import useLoggedIn from "../hooks/useLoggedIn";
import { Detector } from "react-detect-offline";

type Props = {
    tabs: [ReactElement, ReactElement, ReactElement];
};

const Navigation: React.FC<Props> = ({ tabs }) => {
    const { currentTab, setCurrentTab } = useContext(NavigationContext);
    const loggedIn = useLoggedIn();

    return (
        <div>
            <CssBaseline />
            <Box>
                {loggedIn && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                            delay: 0.7,
                        }}
                    >
                        {tabs.map((tab, index) => {
                            if (currentTab === index) {
                                return tab;
                            }
                        })}
                    </motion.div>
                )}
                <AnimatePresence>
                    {loggedIn && (
                        <motion.div
                            key={"navbar"}
                            style={{ position: "fixed", left: 0 }}
                            initial={{ bottom: -100 }}
                            animate={{ bottom: 0 }}
                            exit={{ bottom: -100 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Paper
                                sx={{
                                    width: "100vw",

                                    bgcolor: "secondary.main",
                                    zIndex: 1000,
                                }}
                                elevation={3}
                            >
                                <BottomNavigation
                                    value={currentTab}
                                    onChange={(event, newValue) => {
                                        setCurrentTab(newValue);
                                    }}
                                >
                                    <BottomNavigationAction
                                        label="Transactions"
                                        icon={<RestoreIcon />}
                                    />
                                    <BottomNavigationAction
                                        label="Contacts"
                                        icon={<PeopleIcon />}
                                    />

                                    <BottomNavigationAction
                                        label="Profile"
                                        icon={<ManageAccountsIcon />}
                                    />
                                </BottomNavigation>
                                <Detector
                                    render={({
                                        online,
                                    }: {
                                        online: boolean;
                                    }) => (
                                        <div
                                            className={`text-center text-sm p-1 ${
                                                !online && "bg-danger"
                                            }`}
                                        >
                                            {!online && "you are offline"}
                                        </div>
                                    )}
                                />
                            </Paper>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Box>
        </div>
    );
};

export default Navigation;
