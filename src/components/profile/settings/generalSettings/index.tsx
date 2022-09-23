import {
    List,
    ListSubheader,
    ListItem,
    ListItemIcon,
    ListItemText,
    Switch,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material";
import { FC } from "react";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const GeneralSettings: FC = () => {
    return (
        <List
            sx={{
                width: "100%",
                p: 0,
                m: 0,
                bgcolor: "background.default",
            }}
        >
            <ListItem>
                <ListItemIcon>
                    <AttachMoneyIcon />
                </ListItemIcon>
                <ListItemText id="switch-list-label-wifi" primary="Currency" />
                <FormControl>
                    <Select displayEmpty value={10} label="Age">
                        <MenuItem value={10}>€</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
            </ListItem>
        </List>
    );
};

export default GeneralSettings;
