import {
    Alert,
    Button,
    CircularProgress,
    FormControl,
    Input,
    InputLabel,
} from "@mui/material";
import RememberUserIdCheckbox from "features/remember-id/checkbox";
import useRememberId from "features/remember-id/use-remember-id";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { login } from "../../lib/Pocketbase";

const LandingscreenLoginForm: FC = () => {
    const [error, setError] = useState<string | false>();
    const [pw, setPw] = useState<string>("");
    const { id, setId, enabled, setEnabled } = useRememberId();
    const [status, setStatus] = useState<any>("Login");

    const router = useRouter();

    const handleSubmit = async () => {
        if (!id || !pw) {
            setError("Enter credentials");
            setStatus("Login");
            return;
        }

        setStatus(
            <CircularProgress sx={{ color: "secondary.main" }} size={22} />
        );

        login(id, pw)
            .then((res) => {
                setError(false);
                setStatus("Success!");
                setTimeout(() => router.reload(), 500);
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
                <RememberUserIdCheckbox
                    enabled={enabled}
                    setEnabled={setEnabled}
                />
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
