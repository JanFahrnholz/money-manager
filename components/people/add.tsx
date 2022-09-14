import { useState, forwardRef, ReactElement, Ref, FC, useContext } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import AddIcon from "@mui/icons-material/Add";
import {
    Alert,
    CssBaseline,
    Fab,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import { ContactContext } from "../../context/ContactContext";
import { TransactionContext } from "../../context/TransactionContext";

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: ReactElement;
    },
    ref: Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const AddContact: FC = () => {
    const [open, setOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [name, setName] = useState("");

    const { storage, reload } = useContext(ContactContext);

    const submit = () => {
        if (name === "") {
            setError("Invalid input");
            return;
        }

        storage.add(name);
        reload();

        setOpen(false);
        setError(null);
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
                    bottom: 75,
                    left: "auto",
                    position: "fixed",
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
                <AppBar sx={{ position: "relative", px: 1 }}>
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
                <div className="p-6">
                    {error && (
                        <Alert className="mb-4" severity="error">
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
                        className="m-2"
                        required
                        autoFocus
                    />
                </div>
            </Dialog>
        </div>
    );
};

export default AddContact;
