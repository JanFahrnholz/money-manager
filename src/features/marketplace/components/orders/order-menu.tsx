import FullscreenMenu from "@/components/misc/FullscreenMenu";
import LinkedFrom from "@/components/misc/LinkedFrom";
import Numpad from "@/components/misc/numpad";
import {
    FormControlLabel,
    Grid,
    MenuItem,
    Select,
    Switch,
    TextField,
    Typography,
} from "@mui/material";
import { getDeliveryDateObject } from "lib/Formatter";
import { FC, useState } from "react";
import useOrder from "../../hooks/useOrder";
import { ProductRecord } from "../../types/Product";
import SelectDeliveryTime from "../misc/select-delivery-time";
interface Props {
    product: ProductRecord;
    open: boolean;
    setOpen: (value: boolean) => void;
}
const ProductOrderMenu: FC<Props> = ({ product, open, setOpen }) => {
    const [quantity, setQuantity] = useState(0);
    const [payDirectly, setPayDirectly] = useState(true);
    const [message, setMessage] = useState("");
    const [whenDate, setWhenDate] = useState("today");
    const [whenDatetime, setWhenDatetime] = useState("");
    const { create } = useOrder();
    const submit = async () => {
        const data = {
            quantity,
            payDirectly,
            message,
            when: getDeliveryDateObject(whenDate, whenDatetime),
        };
        create(data, product).then(() => setOpen(false));
    };

    return (
        <>
            <FullscreenMenu
                open={open}
                setOpen={setOpen}
                headerText={`${product.name}`}
                doneText="place order"
                onDone={submit}
            >
                <Typography
                    variant="h2"
                    sx={{
                        textAlign: "center",
                        my: 2,
                        fontWeight: "500",
                        letterSpacing: 1.5,
                    }}
                >
                    {quantity}
                    {product.unit}
                </Typography>

                <Grid container spacing={2}>
                    <Grid xs={6} item>
                        {product.name} {product.description}
                    </Grid>
                    <Grid xs={6} item>
                        from <LinkedFrom owner={product.owner} asText />
                    </Grid>
                    <Grid xs={6} item>
                        Price: {(quantity * product.price).toFixed(2)}€
                    </Grid>
                    <Grid xs={6} item>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={payDirectly}
                                    onChange={() =>
                                        setPayDirectly(!payDirectly)
                                    }
                                />
                            }
                            label="pay directly"
                        />
                    </Grid>
                    <Grid xs={6} item>
                        <Select
                            fullWidth
                            value={whenDate}
                            onChange={(e) => setWhenDate(e.target.value)}
                        >
                            <MenuItem value="today">Today</MenuItem>
                            <MenuItem value="tomorrow">Tomorrow</MenuItem>
                        </Select>
                    </Grid>
                    <Grid xs={6} item>
                        <SelectDeliveryTime
                            fullWidth
                            time={whenDatetime}
                            setTime={setWhenDatetime}
                        />
                    </Grid>

                    <Grid xs={12} item>
                        <TextField
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            label="optional: message"
                            fullWidth
                        />
                    </Grid>
                </Grid>
                <div className="mt-4">
                    <Numpad setter={setQuantity} />
                </div>
            </FullscreenMenu>
        </>
    );
};

export default ProductOrderMenu;
