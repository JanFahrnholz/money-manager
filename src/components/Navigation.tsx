import * as React from "react";
import { FC } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PeopleIcon from "@mui/icons-material/People";
import Paper from "@mui/material/Paper";

type Props = {
    tabs: [FC, FC, FC];
};

const Navigation: React.FC<Props> = ({ tabs }) => {
    const [value, setValue] = React.useState(0);
    const ref = React.useRef<HTMLDivElement>(null);

    return (
        <Box ref={ref}>
            <CssBaseline />
            {tabs.map((tab, index) => {
                if (value === index) {
                    return tab;
                }
            })}
            <Paper
                sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
                elevation={3}
            >
                <BottomNavigation
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
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
                        icon={<AccountCircleIcon />}
                    />
                </BottomNavigation>
            </Paper>
        </Box>
    );
};

export default Navigation;
