import {
    FormControl,
    Grid,
    InputAdornment,
    InputLabel,
    OutlinedInput,
} from "@mui/material";
import { FC, useState } from "react";

const Tools: FC = () => {
    const [v1, setV1] = useState<number>(null!);
    const [rate, setRate] = useState<number>(null!);
    const [v2, setV2] = useState<number>(null!);

    const handleV1 = (value: number) => {
        setV1(value);
        setV2(value * rate);
    };

    const handleRate = (value: number) => {
        setRate(value);
        setV2(v1 * value);
    };

    const handleV2 = (value: number) => {
        setV2(value);
        setRate(value / v1);
    };

    return (
        <div>
            <Grid container sx={{ mt: 6 }}>
                <Grid item xs={4}>
                    <FormControl sx={{ m: 1 }}>
                        <InputLabel htmlFor="outlined-adornment-v1">
                            Amount
                        </InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-v1"
                            type="number"
                            value={v1 ? v1.toFixed(2) : ""}
                            onChange={(e) => handleV1(+e.target.value)}
                            startAdornment={
                                <InputAdornment position="start">
                                    g
                                </InputAdornment>
                            }
                            label="Amount"
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={4}>
                    <FormControl sx={{ m: 1 }}>
                        <InputLabel htmlFor="outlined-adornment-rate">
                            Rate
                        </InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-rate"
                            type="number"
                            value={rate ? rate.toFixed(3) : ""}
                            onChange={(e) => handleRate(+e.target.value)}
                            startAdornment={
                                <InputAdornment position="start">
                                    x
                                </InputAdornment>
                            }
                            label="Amount"
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={4}>
                    <FormControl sx={{ m: 1 }}>
                        <InputLabel htmlFor="outlined-adornment-v2">
                            Amount
                        </InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-v2"
                            value={v2 ? v2.toFixed(2) : ""}
                            type="number"
                            onChange={(e) => handleV2(+e.target.value)}
                            startAdornment={
                                <InputAdornment position="start">
                                    $
                                </InputAdornment>
                            }
                            label="Amount"
                        />
                    </FormControl>
                </Grid>
            </Grid>
        </div>
    );
};

export default Tools;
