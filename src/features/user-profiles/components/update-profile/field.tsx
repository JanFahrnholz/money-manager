import { CircularProgress, Grid, TextField } from "@mui/material";
import useProfile from "features/user-profiles/hooks/useProfile";
import useUpdate from "features/user-profiles/hooks/useUpdate";
import useInputDelay from "hooks/useInputDelay";
import { FC, useEffect, useState } from "react";

interface Props {
    prop: string;
    placeholder: string;
    maxLength?: number;
    helperText?: string;
}

const ProfileUpdateField: FC<Props> = ({
    prop,
    placeholder,
    maxLength,
    helperText,
}) => {
    const [loading, setLoading] = useState(false);
    const update = useUpdate();
    const [value, setValue] = useState("");
    const [lastValue, setLastValue] = useState("");
    const { profile } = useProfile();
    const reset = useInputDelay(1500, async () => {
        setLoading(true);
        try {
            await update({ [prop]: value });
            setLastValue(value);
            setTimeout(() => setLoading(false), 300);
        } catch (error) {
            setValue(lastValue);
            setLoading(false);
        }
    });

    const handleChange = (input: string) => {
        setValue(input);
        reset();
    };

    useEffect(() => {
        if (!profile?.username) return;
        setValue(profile.username);
        setLastValue(profile.username);
    }, [profile]);

    return (
        <>
            <Grid container>
                <Grid xs={6} item>
                    <span className="flex items-center m-2 ">{prop}</span>
                </Grid>
                <Grid xs={6} item>
                    <TextField
                        size="small"
                        fullWidth
                        value={value}
                        onChange={(e) => handleChange(e.target.value)}
                        placeholder={placeholder}
                        helperText={helperText}
                        InputProps={{
                            endAdornment: loading && (
                                <CircularProgress size={10} />
                            ),
                        }}
                    />
                </Grid>
            </Grid>
        </>
    );
};

export default ProfileUpdateField;
