import FullscreenMenu from "@/components/misc/FullscreenMenu";
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
import useChat from "features/chats/hooks/useChat";
import Username from "features/user-profiles/components/username";
import { getDeliveryDateObject } from "lib/Formatter";
import { FC, useEffect, useState } from "react";
import useOrder from "../../hooks/useOrder";
import { ProductRecord } from "../../types/Product";
import SelectDeliveryTime from "../misc/select-delivery-time";
interface Props {
    product: ProductRecord;
    open: boolean;
    setOpen: (value: boolean) => void;
}
const ProductOrderMenu: FC<Props> = ({ product, open, setOpen }) => {
    const [amount, setAmount] = useState(0);
    const [payDirectly, setPayDirectly] = useState(true);
    const [whenDate, setWhenDate] = useState("today");
    const [whenDatetime, setWhenDatetime] = useState("");
    const { create } = useOrder();
    const chat = useChat();

    const quantity = product.divisible
        ? amount / product.price
        : Math.floor(amount / product.price);

    useEffect(() => {
        setAmount(quantity * product.price);
    }, [product.price, quantity]);

    const submit = async () => {
        try {
            const orderChat = await chat.create(product.owner);
            const data = {
                quantity,
                payDirectly,
                chat: orderChat.id,
                when: getDeliveryDateObject(whenDate, whenDatetime),
            };
            await create(data, product);
            setOpen(false);
        } catch (error) {}
    };

    return (
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
                {amount}€
            </Typography>

            <Grid container spacing={1}>
                <Grid xs={6} item>
                    Price: {product.price}€/{product.unit}
                </Grid>
                <Grid xs={6} item>
                    from <Username id={product.owner} />
                </Grid>
                <Grid xs={6} item>
                    Quantity: {quantity.toFixed(product.divisible ? 2 : 0)}
                    {product.unit}
                </Grid>
                <Grid xs={6} item>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={payDirectly}
                                onChange={() => setPayDirectly(!payDirectly)}
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
            </Grid>
            <div className="mt-2">
                <Numpad setter={setAmount} disableDot={!product.divisible} />
            </div>
        </FullscreenMenu>
    );
};

export default ProductOrderMenu;
