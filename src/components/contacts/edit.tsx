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
import { create, update } from "../../lib/Contacts";
import useLoggedIn from "../../hooks/useLoggedIn";
import Contact from "../../types/Contact";
import Record from "../../types/Record";

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: ReactElement;
    },
    ref: Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

type Props = {
    open: boolean;
    setOpen: (data: boolean) => void;
    contact: Record<Contact>;
};

const EditContact: FC<Props> = ({ open, setOpen, contact }) => {
    const [name, setName] = useState(contact.name);
    const [userId, setUserId] = useState(contact.user);
    const [error, setError] = useState<string | null>(null);
    const loggedIn = useLoggedIn();

    if (!loggedIn) return <></>;

    const submit = () => {
        update(contact.id, { name, user: userId })
            .then((res) => {
                setOpen(false);
                setError(null);
            })
            .catch((err) => {
                setError(err.message);
            });
    };

    return (
        <div>
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
                            Edit contact
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

export default EditContact;
