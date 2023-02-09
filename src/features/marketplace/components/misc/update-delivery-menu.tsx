import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    DialogActions,
    Grid,
} from "@mui/material";
import useOrder from "features/marketplace/hooks/useOrder";
import { OrderRecord } from "features/marketplace/types/Order";
import {
    getDeliveryDateObject,
    getDeliveryTime,
    setDeliveryTime,
} from "lib/Formatter";
import { FC, useState } from "react";
import { toast } from "react-hot-toast";
import SelectDeliveryTime from "./select-delivery-time";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
    order: OrderRecord;
}

const UpdateDeliveryMenu: FC<Props> = ({ order }) => {
    const [open, setOpen] = useState(false);
    const [location, setLocation] = useState(order.location);
    const [time, setTime] = useState("");
    const { update, loading } = useOrder();

    const handleUpdate = async () => {
        const data = {
            ...order,
            location,
            when: setDeliveryTime(order.when, time),
        };

        await update(data);
        setOpen(false);
    };
    return (
        <>
            <Button
                size="small"
                onClick={() => setOpen(true)}
                disabled={loading}
            >
                edit
            </Button>

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                sx={{ bottom: "40%" }}
                fullWidth
            >
                <DialogTitle>update delivery</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        update the delivery instructions
                    </DialogContentText>
                    <Grid container spacing={1} sx={{ mt: 1 }}>
                        <Grid item xs={8}>
                            <TextField
                                autoFocus
                                label="location"
                                fullWidth
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <SelectDeliveryTime
                                time={time}
                                setTime={setTime}
                                initial={getDeliveryTime(order.when)}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button
                        variant="outlined"
                        onClick={() => handleUpdate()}
                        disabled={loading}
                    >
                        update
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default UpdateDeliveryMenu;
