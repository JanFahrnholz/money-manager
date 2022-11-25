import { useState, forwardRef, ReactElement, Ref, FC } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import AddIcon from "@mui/icons-material/Add";
import { Alert, DialogContent, Fab, TextField } from "@mui/material";
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
    const [error, setError] = useState<string | null>(null);

    const submit = () => {
        create({ name, balance: 0, user: userId })
            .then((res) => {
                setOpen(false);
                setError(null);
                setName("");
            })
            .catch((err) => {
                setError(err.message);
            });
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
                    {error && (
                        <Alert
                            className="mb-1"
                            severity="error"
                            variant="filled"
                        >
                            {error}
                        </Alert>
                    )}

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
                        id="user-id-input"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        label="Link User ID"
                        variant="outlined"
                        fullWidth
                        type={"text"}
                        className="mt-2"
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AddContact;
