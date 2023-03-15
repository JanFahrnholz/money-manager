import Contact from "@/types/Contact";
import Transaction from "@/types/Transaction";
import AddIcon from "@mui/icons-material/Add";
import {
    Checkbox,
    Fab,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { FC, useState } from "react";
import useLoggedIn from "../../hooks/useLoggedIn";
import { create as createPlanned } from "../../lib/PlannedTransactions";
import { create as createRegular } from "../../lib/Transactions";
import TransactionType from "../../types/TransactionType";
import ContactAutocomplete from "../contacts/helper/autocomplete-select";
import FullscreenMenu from "../misc/FullscreenMenu";
import Numpad from "../misc/numpad";

const AddTransaction: FC = () => {
    const [open, setOpen] = useState(false);
    const [planned, setPlanned] = useState(false);
    const [amount, setAmount] = useState<number>(0);
    const [contact, setContact] = useState<Contact>();
    const [info, setInfo] = useState<string | undefined>();
    const [type, setType] = useState<TransactionType>("Einnahme");
    const loggedIn = useLoggedIn();

    if (!loggedIn) return <></>;

    const types = ["Einnahme", "Ausgabe", "Rechnung", "Rückzahlung"];

    const submit = () => {
        if (!contact) return;
        const data: Pick<Transaction, "amount" | "info" | "type" | "contact"> =
            {
                amount,
                info: info || "",
                type,
                contact: contact.id,
            };

        const p = planned ? createPlanned(data) : createRegular(data);

        p.then(() => {
            setInfo(undefined);
            setOpen(false);
        });
    };

    return (
        <>
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
            <FullscreenMenu
                open={open}
                setOpen={setOpen}
                headerText={"new transaction"}
                onDone={() => submit()}
            >
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
                        <ContactAutocomplete
                            contact={contact}
                            setContact={setContact}
                        />
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
                                    setType(e.target.value as TransactionType)
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
                <Grid container sx={{ mt: 1 }} columnSpacing={1}>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <TextField
                                placeholder="Optional: Info"
                                fullWidth
                                type="text"
                                onChange={(e) => setInfo(e.target.value)}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} onClick={() => setPlanned(!planned)}>
                        <FormControl fullWidth sx={{ p: 1 }}>
                            <FormControlLabel
                                control={<Checkbox checked={planned} />}
                                label={"planned"}
                            />
                        </FormControl>
                    </Grid>
                </Grid>
                <div className="mt-2">
                    <Numpad setter={setAmount} />
                </div>
            </FullscreenMenu>
        </>
    );
};

export default AddTransaction;
