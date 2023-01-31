import FullscreenMenu from "@/components/misc/FullscreenMenu";
import Numpad from "@/components/misc/numpad";
import {
    Box,
    Button,
    Container,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
import { FC, useState } from "react";
import useCreateProduct from "../../hooks/useCreateProduct";

const CreateProduct: FC = () => {
    const [open, setOpen] = useState(false);
    const [price, setPrice] = useState(0);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [stock, setStock] = useState(0);
    const [unit, setUnit] = useState("");
    const create = useCreateProduct();

    const submit = async () => {
        const data = {
            name,
            description,
            price,
            stock,
            unit,
        };
        try {
            const done = await create(data);
            setOpen(!done);
        } catch (error) {}
    };

    return (
        <div className="text-center">
            <Button variant="outlined" onClick={() => setOpen(!open)}>
                new product
            </Button>
            <FullscreenMenu
                open={open}
                setOpen={setOpen}
                headerText="new product"
                onDone={submit}
                doneText="save"
            >
                <Container sx={{ mb: 3 }}>
                    <Typography
                        variant="h2"
                        sx={{
                            textAlign: "center",
                            mt: 3.5,
                            fontWeight: "500",
                            letterSpacing: 1.5,
                        }}
                    >
                        {price.toFixed(2)}€{unit && `/${unit}`}
                    </Typography>
                </Container>
                <Grid container spacing={2}>
                    <Grid xs={6} item>
                        <TextField
                            label="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid xs={6} item>
                        <TextField
                            label="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            fullWidth
                        />
                    </Grid>

                    <Grid xs={3} item>
                        <TextField
                            label="stock"
                            type={"number"}
                            value={stock}
                            onChange={(e) => setStock(+e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid xs={3} item>
                        <TextField
                            inputProps={{ maxLength: 3 }}
                            label="unit"
                            value={unit}
                            onChange={(e) => setUnit(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                </Grid>
                <div className="mt-4">
                    <Numpad setter={setPrice} />
                </div>
            </FullscreenMenu>
        </div>
    );
};

export default CreateProduct;
