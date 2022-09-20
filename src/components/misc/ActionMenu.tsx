import { Global } from "@emotion/react";
import styled from "@emotion/styled";
import {
    Box,
    Button,
    CssBaseline,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Skeleton,
    SwipeableDrawer,
    Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import container from "postcss/lib/container";
import { FC, useState } from "react";

type Props = {
    actions: {
        name: string;
        color?: string;
        action: Function;
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
        <Root>
            <CssBaseline />
            <Global
                styles={{
                    ".MuiDrawer-root > .MuiPaper-root": {
                        overflow: "visible",
                        background: "transparent",
                        boxShadow: "none",
                    },
                }}
            />

            <SwipeableDrawer
                anchor="bottom"
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
        </Root>
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
    backgroundColor: theme.palette.background.default,
    borderRadius: 3,
    position: "absolute",
    top: 8,
    left: "calc(50% - 15px)",
}));

const StyledBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
}));
export default ActionMenu;
