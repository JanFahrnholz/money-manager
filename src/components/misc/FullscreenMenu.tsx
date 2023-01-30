import { FC, ReactNode } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { DialogContent } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import Toolbar from "@mui/material/Toolbar";
import { TransitionProps } from "@mui/material/transitions";
import Typography from "@mui/material/Typography";
import { forwardRef, ReactElement, Ref } from "react";

interface Props {
    open: boolean;
    setOpen: (value: boolean) => void;
    children: ReactNode;
    headerText: string;
    onDone?: Function;
    doneText?: string;
}

const FullscreenMenu: FC<Props> = ({
    open,
    setOpen,
    headerText,
    doneText,
    onDone,
    children,
}) => {
    return (
        <>
            <Dialog
                fullScreen
                open={open}
                onClose={() => setOpen(false)}
                TransitionComponent={Transition}
            >
                <AppBar
                    sx={{
                        position: "relative",
                        px: 1,
                        bgcolor: "primary.main",
                        color: "primary.contrastText",
                    }}
                >
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={() => setOpen(false)}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography
                            sx={{ ml: 2, flex: 1 }}
                            variant="h6"
                            component="div"
                        >
                            {headerText}
                        </Typography>
                        <Button
                            autoFocus
                            color="inherit"
                            onClick={() => onDone && onDone()}
                        >
                            {doneText || "done"}
                        </Button>
                    </Toolbar>
                </AppBar>
                <DialogContent sx={{ bgcolor: "background.default" }}>
                    {children}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default FullscreenMenu;

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: ReactElement;
    },
    ref: Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});
