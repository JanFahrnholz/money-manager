import {
    FormControl,
    InputLabel,
    Alert,
    Button,
    CircularProgress,
    Input,
} from "@mui/material";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { m, motion } from "framer-motion";
import { login } from "../../lib/Pocketbase";

const LandingscreenLoginForm: FC = () => {
    const [error, setError] = useState<string | false>();
    const [pw, setPw] = useState<string>("");
    const [id, setId] = useState<string>("");
    const [status, setStatus] = useState<any>("Access ID");

    const router = useRouter();

    const handleSubmit = async () => {
        if (!id || !pw) {
            setError("Enter credentials");
            setStatus("Access ID");
            return;
        }

        setStatus(
            <CircularProgress sx={{ color: "secondary.main" }} size={22} />
        );

        login(id, pw)
            .then((res) => {
                setError(false);
                setStatus("Success!");
            })
            .catch((err) => {
                setError(err.message);
                setStatus("Try again");
            });
    };
    return (
        <>
            <div className="absolute center-anchor left-1/2">
                <FormControl>
                    <InputLabel>User ID</InputLabel>
                    <Input
                        sx={{ width: 250 }}
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                    />
                </FormControl>

                <FormControl className="mt-4">
                    <InputLabel>password</InputLabel>
                    <Input
                        type="password"
                        sx={{ width: 250 }}
                        value={pw}
                        onChange={(e) => setPw(e.target.value)}
                    />
                </FormControl>
                {error && (
                    <Alert className="mt-4" severity="error" variant="filled">
                        {error}
                    </Alert>
                )}
                <div className="text-center mt-4">
                    <Button
                        variant="contained"
                        size="large"
                        fullWidth
                        onClick={() => handleSubmit()}
                    >
                        {status}
                    </Button>
                </div>
            </div>
        </>
    );
};

export default LandingscreenLoginForm;
