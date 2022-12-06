import { Global } from "@emotion/react";
import styled from "@emotion/styled";
import {
    Box,
    CssBaseline,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Paper,
    SwipeableDrawer,
} from "@mui/material";
import { FC } from "react";

type Props = {
    actions: {
        name: string;
        color?: string;
        action: Function | undefined;
    }[];
    open: boolean;
    setOpen: Function;
};

const ActionMenu: FC<Props> = ({ actions, open, setOpen }) => {
    const iOS =
        typeof navigator !== "undefined" &&
        /iPad|iPhone|iPod/.test(navigator.userAgent);

    const drawerBleeding = 0;

    return (
        <Paper
            sx={{
                background: "transparent",
            }}
        >
            <CssBaseline />
            <Global
                styles={{
                    ".MuiDrawer-root > .MuiPaper-root": {
                        overflow: "visible",
                        background: "transparent",
                        boxShadow: "none",
                        zIndex: 1600,
                    },
                }}
            />

            <SwipeableDrawer
                anchor="bottom"
                sx={{ zIndex: 1600 }}
                open={open}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                swipeAreaWidth={drawerBleeding}
                disableSwipeToOpen={false}
                ModalProps={{
                    keepMounted: true,
                }}
            >
                <List sx={{ p: 4 }}>
                    {actions.map((a) => (
                        <ListItem
                            key={a.name}
                            sx={{
                                background: "#303030",
                                borderRadius: 1,
                                color: a.color ? a.color : "#fff",
                                my: 1.5,
                                p: 0.5,
                            }}
                        >
                            <ListItemButton
                                onClick={() => {
                                    if (!a.action) return;
                                    a.action();
                                    setOpen(false);
                                }}
                            >
                                <ListItemText primary={a.name} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </SwipeableDrawer>
        </Paper>
    );
};

const Root = styled("div")(({ theme }) => ({
    height: "100%",
    backgroundColor: "transparent",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
}));

const Puller = styled(Box)(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: "background.default",
    borderRadius: 3,
    position: "absolute",
    top: 8,
    left: "calc(50% - 15px)",
}));

const StyledBox = styled(Box)(({ theme }) => ({
    backgroundColor: "background.default",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
}));
export default ActionMenu;
