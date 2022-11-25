import { ReactElement, FC, useRef, useContext } from "react";
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

type Props = {
    tabs: [ReactElement, ReactElement, ReactElement, ReactElement];
};

const Navigation: React.FC<Props> = ({ tabs }) => {
    const { currentTab, setCurrentTab } = useContext(NavigationContext);
    const ref = useRef<HTMLDivElement>(null);

    return (
        <div>
            <CssBaseline />
            <Box ref={ref}>
                {tabs.map((tab, index) => {
                    if (currentTab === index) {
                        return tab;
                    }
                })}
                <Paper
                    sx={{
                        position: "fixed",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        pb: 3,
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
                            label="Tools"
                            icon={<PercentIcon />}
                        />
                        <BottomNavigationAction
                            label="Profile"
                            icon={<ManageAccountsIcon />}
                        />
                    </BottomNavigation>
                </Paper>
            </Box>
        </div>
    );
};

export default Navigation;
