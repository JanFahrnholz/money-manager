import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PeopleIcon from "@mui/icons-material/People";
import RestoreIcon from "@mui/icons-material/Restore";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import { AnimatePresence, motion } from "framer-motion";
import { ReactElement, useContext } from "react";
import { NavigationContext } from "../context/NavigationContext";
import useLoggedIn from "../hooks/useLoggedIn";
import StoreIcon from "@mui/icons-material/Store";
import useProfile from "features/user-profiles/hooks/useProfile";
type Props = {
    tabs: [ReactElement, ReactElement, ReactElement, ReactElement];
};

const Navigation: React.FC<Props> = ({ tabs }) => {
    const { currentTab, setCurrentTab } = useContext(NavigationContext);
    const loggedIn = useLoggedIn();

    const { profile } = useProfile();

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
                                    pb: 2.5,
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
                                        label="Marketplace"
                                        icon={<StoreIcon />}
                                    />
                                    <BottomNavigationAction
                                        label="Profile"
                                        icon={<ManageAccountsIcon />}
                                    />
                                </BottomNavigation>
                            </Paper>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Box>
        </div>
    );
};

export default Navigation;
