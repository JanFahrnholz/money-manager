import { Button, Grid } from "@mui/material";
import { FC, useState } from "react";

type NumpadProps = {
    setter: (data: number) => void;
};

const Numpad: FC<NumpadProps> = ({ setter }) => {
    const buttons = [];
    const [innerValue, setValue] = useState<string>("");
    const [dotted, setDotted] = useState(false);
    const [count, setCount] = useState(0);
    const [disabled, setDisabled] = useState(false);

    const add = (button: number | ".") => {
        if (button == ".") setDotted(true);
        if (button == "." && !innerValue) setValue("0");
        const v = innerValue + button.toString();
        setValue(v);
        setter(+v);
        if (dotted) {
            const i = count + 1;
            setCount(i);
            if (i >= 2) {
                setDisabled(true);
                return;
            }
        }
    };

    for (let i = 1; i < 10; ++i) {
        buttons.push(
            <Grid item xs={4} key={i}>
                <Button
                    disabled={disabled}
                    variant="outlined"
                    sx={{ height: "10vh", fontSize: 26 }}
                    fullWidth
                    onClick={() => add(i)}
                >
                    {i}
                </Button>
            </Grid>
        );
    }

    const clear = () => {
        setDotted(false);
        setCount(0);
        setDisabled(false);
        setValue("");
        setter(0);
    };

    return (
        <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{ maxHeight: "6rem" }}
        >
            {buttons}

            <Grid item xs={4}>
                <Button
                    variant="outlined"
                    sx={{ height: "10vh", fontSize: 26 }}
                    fullWidth
                    onClick={() => clear()}
                >
                    C
                </Button>
            </Grid>
            <Grid item xs={4}>
                <Button
                    disabled={disabled}
                    variant="outlined"
                    sx={{ height: "10vh", fontSize: 26 }}
                    fullWidth
                    onClick={() => add(0)}
                >
                    {0}
                </Button>
            </Grid>
            {!dotted && (
                <Grid item xs={4}>
                    <Button
                        disabled={disabled}
                        variant="outlined"
                        sx={{ height: "10vh", fontSize: 26 }}
                        fullWidth
                        onClick={() => add(".")}
                    >
                        .
                    </Button>
                </Grid>
            )}
        </Grid>
    );
};
export default Numpad;
