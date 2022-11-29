import {
    useState,
    forwardRef,
    ReactElement,
    Ref,
    FC,
    useContext,
    useEffect,
} from "react";
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
import {
    DialogContent,
    Fab,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import Numpad from "../misc/numpad";
import { create } from "../../lib/Transactions";
import TransactionType from "../../types/TransactionType";
import Error from "../misc/Error";
import { ContactContext } from "../../context/ContactContext";
import { client } from "../../lib/Pocketbase";
import useLoggedIn from "../../hooks/useLoggedIn";

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
    const [error, setError] = useState(null);
    const [amount, setAmount] = useState<number>(0);
    const [contact, setContact] = useState<string>("");
    const [info, setInfo] = useState<string | undefined>();
    const [type, setType] = useState<TransactionType>("Einnahme");
    const { contacts } = useContext(ContactContext);
    const loggedIn = useLoggedIn();

    if (!loggedIn) return <></>;

    const types = ["Einnahme", "Ausgabe", "Rechnung", "Rückzahlung"];

    const submit = () => {
        create({ amount, info, contact, type })
            .then((res) => {
                setInfo(undefined);
                setOpen(false);
            })
            .catch((err) => setError(err.message));
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
                New Transaction
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
                <DialogContent sx={{ bgcolor: "background.default" }}>
                    <Error error={error} />
                    <Typography
                        variant="h2"
                        sx={{
                            textAlign: "center",
                            my: 3.5,
                            fontWeight: "500",
                            letterSpacing: 1.5,
                        }}
                    >
                        {amount.toFixed(2)}€
                    </Typography>

                    <Grid container columnSpacing={1}>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">
                                    Contact
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={contact}
                                    label="Contact"
                                    onChange={(e) => setContact(e.target.value)}
                                    required
                                    placeholder="Select a contact"
                                >
                                    {contacts &&
                                        contacts.map((c) => (
                                            <MenuItem value={c.id} key={c.id}>
                                                {c.name}
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
                                    onChange={(e) =>
                                        setType(
                                            e.target.value as TransactionType
                                        )
                                    }
                                    required
                                    placeholder="Select a transaction type"
                                >
                                    {types.map((type) => (
                                        <MenuItem value={type} key={type}>
                                            {type}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <TextField
                        sx={{ mt: 1 }}
                        placeholder="Optional: Info"
                        fullWidth
                        type="text"
                        onChange={(e) => setInfo(e.target.value)}
                    />
                    <div className="mt-2">
                        <Numpad setter={setAmount} />
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AddTransaction;
