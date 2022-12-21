import { Global } from "@emotion/react";
import { Box, CssBaseline, styled, SwipeableDrawer } from "@mui/material";
import { FC } from "react";

type DetailDrawerProps = {
    children: any;
    open: boolean;
    setOpen: (value: boolean) => void;
};

const DetailDrawer: FC<DetailDrawerProps> = (props) => {
    const { children, open, setOpen } = props;

    const iOS =
        typeof navigator !== "undefined" &&
        /iPad|iPhone|iPod/.test(navigator.userAgent);

    const drawerBleeding = 0;
    const drawerHeight = 400;

    return (
        <Root>
            <CssBaseline />
            <Global
                styles={{
                    ".MuiDrawer-root > .MuiPaper-root": {
                        height: `${drawerHeight}px`,
                        overflow: "visible",
                        borderRadius: 8,
                        background: "#303030",
                        opacity: 1,
                        zIndex: 1600,
                    },
                }}
            />
            <SwipeableDrawer
                open={open}
                anchor="bottom"
                swipeAreaWidth={drawerBleeding}
                disableSwipeToOpen={false}
                disableBackdropTransition={!iOS}
                disableDiscovery={iOS}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
            >
                <StyledBox
                    sx={{
                        position: "absolute",
                        top: -drawerBleeding,
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                        height: `${drawerHeight}px`,
                        visibility: "visible",
                        right: 0,
                        left: 0,
                    }}
                >
                    <Puller />
                    {children}
                </StyledBox>
            </SwipeableDrawer>
        </Root>
    );
};

const Root = styled("div")(({ theme }) => ({
    height: "100%",
    backgroundColor: theme.palette.background.default,
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

export default DetailDrawer;
