import ReactHook from "@/types/react-hook";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControlLabel,
    Grid,
    Switch,
    TextField,
} from "@mui/material";
import useOrder from "features/marketplace/hooks/useOrder";
import { OrderRecord } from "features/marketplace/types/Order";
import { getDeliveryTime, setDeliveryTime } from "lib/Formatter";
import { FC, ReactNode, useEffect, useState } from "react";
import SelectDeliveryTime from "./select-delivery-time";

interface Props {
    order: OrderRecord;
    open: boolean;
    setOpen: ReactHook<boolean>;
    handler?: (
        open: boolean,
        setOpen: ReactHook<boolean>,
        loading: boolean
    ) => ReactNode;
}

const UpdateOrderMenu: FC<Props> = ({ order, handler, open, setOpen }) => {
    const [payDirectly, setPayDirectly] = useState(order.payDirectly);

    const [location, setLocation] = useState(order.location);
    const [time, setTime] = useState("");
    const { update, loading } = useOrder();

    const handleClose = () => setOpen(false);

    const handleUpdate = async () => {
        const data = {
            ...order,
            location,
            payDirectly,
            when: setDeliveryTime(order.when, time),
        };

        await update(data);
        handleClose();
    };

    return (
        <>
            {handler !== undefined && handler(open, setOpen, loading)}

            <Dialog
                open={open}
                onClose={() => handleClose()}
                sx={{ bottom: "40%" }}
                fullWidth
            >
                <DialogTitle>Update order</DialogTitle>
                <DialogContent>
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
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={payDirectly}
                                        onChange={(e, value) =>
                                            setPayDirectly(value)
                                        }
                                    />
                                }
                                label="pay directly"
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClose()}>Cancel</Button>
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

export default UpdateOrderMenu;
