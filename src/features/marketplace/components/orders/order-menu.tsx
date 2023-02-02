import FullscreenMenu from "@/components/misc/FullscreenMenu";
import LinkedFrom from "@/components/misc/LinkedFrom";
import Numpad from "@/components/misc/numpad";
import {
    FormControlLabel,
    Grid,
    Switch,
    TextField,
    Typography,
} from "@mui/material";
import { FC, useContext, useState } from "react";
import { MarketplaceContext } from "../../context";
import useOrder from "../../hooks/useOrder";
import { ProductRecord } from "../../types/Product";
interface Props {
    product: ProductRecord;
    open: boolean;
    setOpen: (value: boolean) => void;
}
const ProductOrderMenu: FC<Props> = ({ product, open, setOpen }) => {
    const [qty, setQty] = useState(0);
    const [payDirectly, setPayDirectly] = useState(true);
    const [message, setMessage] = useState("");
    const { create } = useOrder();
    const submit = async () => {
        create(product, qty, message, payDirectly).then(() => setOpen(false));
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
                    {qty}
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
                        Price: {(qty * product.price).toFixed(2)}€
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
                    <Numpad setter={setQty} />
                </div>
            </FullscreenMenu>
        </>
    );
};

export default ProductOrderMenu;
