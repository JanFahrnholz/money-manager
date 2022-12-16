import {
    Alert,
    Button,
    CircularProgress,
    FormControl,
    TextField,
} from "@mui/material";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { register } from "../../lib/Pocketbase";
import PasswordStrengthBar from "react-password-strength-bar";

const LandingscreenRegisterForm: FC = () => {
    const [error, setError] = useState<string | false>();
    const [focused, setFocused] = useState(false);
    const [status, setStatus] = useState<any>("Create ID");
    const [pw, setPw] = useState<string>("");
    const [pw2, setPw2] = useState<string>("");
    const router = useRouter();

    const handleSubmit = async () => {
        setStatus(
            <CircularProgress sx={{ color: "secondary.main" }} size={22} />
        );

        if (!pw || !pw2) {
            setError("Enter a password");
            setStatus("Create ID");
            return;
        }

        if (pw !== pw2) {
            setError("Passwords do not match");
            setStatus("Create ID");
            return;
        }

        register(pw, pw2)
            .then((res) => {
                setStatus("Success!");
                setError(false);
            })
            .catch((err) => {
                setStatus("Try again");
                setError(err.message);
            });
    };
    return (
        <>
            <div className="absolute center-anchor left-1/2 ">
                <FormControl>
                    <TextField
                        type="password"
                        placeholder="Master password"
                        helperText="must be at least 8 characters long"
                        value={pw}
                        variant="standard"
                        onChange={(e) => setPw(e.target.value)}
                        onFocus={(e) => setFocused(true)}
                        sx={{ width: 250 }}
                    />
                </FormControl>
                <PasswordStrengthBar password={pw} minLength={8} />

                {focused && (
                    <motion.div
                        key={"register-confirm-password"}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <FormControl className="mt-4">
                            <TextField
                                type="password"
                                placeholder="confirm password"
                                value={pw2}
                                variant="standard"
                                onChange={(e) => setPw2(e.target.value)}
                                onBlur={(e) => setFocused(false)}
                                sx={{ width: 250 }}
                            />
                        </FormControl>
                    </motion.div>
                )}
                {error && (
                    <Alert className="mt-4" severity="error" variant="filled">
                        {error}
                    </Alert>
                )}
                <div className="text-center mt-4">
                    <Button
                        variant="contained"
                        fullWidth
                        size="large"
                        onClick={() => handleSubmit()}
                    >
                        {status}
                    </Button>
                </div>
            </div>
        </>
    );
};

export default LandingscreenRegisterForm;
