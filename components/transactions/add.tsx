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
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Zoom,
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

const AddTransaction: FC = () => {
    const [open, setOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [amount, setAmount] = useState(0);
    const [person, setContact] = useState(0);
    const [type, setType] = useState(1);

    const cCtx = useContext(ContactContext);
    const tCtx = useContext(TransactionContext);

    const submit = () => {
        if (type! <= 0 || amount === 0 || person! <= 0) {
            setError("Invalid input");
            return;
        }

        const t = tCtx.storage.add(amount, person, type, null);
        cCtx.storage.addTransaction(person, t.id);

        if (tCtx.storage.isType(t.id, "Rechnung")) {
            cCtx.storage.addBalance(person, amount);
        }

        if (tCtx.storage.isType(t.id, "Rückzahlung")) {
            cCtx.storage.addBalance(person, -amount);
        }

        tCtx.reload();

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
                New Transaction
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
                            New Transaction
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
                        id="amount-input"
                        value={amount}
                        onChange={(e) => setAmount(+e.target.value)}
                        label="Amount"
                        variant="outlined"
                        fullWidth
                        type="number"
                        required
                        autoFocus
                        className="my-2"
                    />

                    <Grid container>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">
                                    Contact
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={person}
                                    label="Age"
                                    onChange={(e) =>
                                        setContact(+e.target.value)
                                    }
                                    required
                                    placeholder="Select a person"
                                >
                                    {cCtx.storage.contacts.map((person) => (
                                        <MenuItem
                                            value={person.id}
                                            key={person.id}
                                        >
                                            {person.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">
                                    Type
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={type}
                                    label="Age"
                                    onChange={(e) => setType(+e.target.value)}
                                    required
                                    placeholder="Select a transaction type"
                                >
                                    {tCtx.storage.types.map((type) => (
                                        <MenuItem value={type.id} key={type.id}>
                                            {type.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </div>
            </Dialog>
        </div>
    );
};

export default AddTransaction;
