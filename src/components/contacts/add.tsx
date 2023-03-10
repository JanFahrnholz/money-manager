import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { DialogContent, Fab, TextField } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import Toolbar from "@mui/material/Toolbar";
import { TransitionProps } from "@mui/material/transitions";
import Typography from "@mui/material/Typography";
import { FC, forwardRef, ReactElement, Ref, useState } from "react";
import useLoggedIn from "../../hooks/useLoggedIn";
import { create } from "../../lib/Contacts";

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: ReactElement;
    },
    ref: Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const AddContact: FC = () => {
    const [name, setName] = useState("");
    const [userId, setUserId] = useState("");
    const [open, setOpen] = useState(false);
    const loggedIn = useLoggedIn();

    if (!loggedIn) return <></>;

    const submit = () => {
        const promise = create({ name, balance: 0, user: userId })
            .then(() => {
                setOpen(false);
                setName("");
            })
            .catch();
    };

    return (
        <div>
            <Fab
                variant="extended"
                size="medium"
                color="primary"
                aria-label="add"
                style={{
                    margin: 0,
                    top: "auto",
                    right: 15,
                    bottom: 90,
                    left: "auto",
                    position: "fixed",
                    zIndex: 50,
                }}
                onClick={() => setOpen(true)}
            >
                <AddIcon sx={{ mr: 1 }} />
                New contact
            </Fab>
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
                            Add new contact
                        </Typography>
                        <Button
                            autoFocus
                            color="inherit"
                            onClick={() => submit()}
                        >
                            save
                        </Button>
                    </Toolbar>
                </AppBar>
                <DialogContent sx={{ bgcolor: "background.default" }}>
                    <TextField
                        id="name-input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        label="Name"
                        variant="outlined"
                        fullWidth
                        type={"text"}
                        className="mt-2"
                        required
                        autoFocus
                    />

                    <TextField
                        sx={{ mt: 1 }}
                        id="user-id-input"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        label="Link User ID"
                        variant="outlined"
                        fullWidth
                        type={"text"}
                        className="mt-2"
                    />
                    <Typography sx={{ mt: 1, color: "text.secondary" }}>
                        By linking a contact, the other user can see their
                        transactions you created.
                    </Typography>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AddContact;
