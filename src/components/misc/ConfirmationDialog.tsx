import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { FC, forwardRef, ReactElement } from "react";

type Props = {
    open: boolean;
    setOpen: (state: boolean) => void;
    title: string;
    content: any;
    agreeText: string;
    disagreeText: string;
    action: Function;
};

const ConfirmationDialog: FC<Props> = ({
    open,
    setOpen,
    title,
    content,
    agreeText,
    disagreeText,
    action,
}) => {
    return (
        <Dialog
            open={open}
            fullWidth
            TransitionComponent={Transition}
            onClose={() => setOpen(false)}
            aria-describedby="alert-dialog-slide-description"
            sx={{ backgroundImage: "none" }}
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)}>{disagreeText}</Button>
                <Button
                    onClick={() => {
                        action();
                        setOpen(false);
                    }}
                    color="primary"
                    variant="outlined"
                >
                    {agreeText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationDialog;

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});
