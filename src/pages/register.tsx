import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
    Alert,
    Avatar,
    CircularProgress,
    CssBaseline,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { FC, useState } from "react";
import { useRouter } from "next/router";
import { register } from "../lib/Pocketbase";

const RegisterPage: FC = () => {
    const [error, setError] = useState<string | false>();
    const [status, setStatus] = useState<any>("Create");
    const router = useRouter();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setStatus(
            <CircularProgress sx={{ color: "secondary.main" }} size={14} />
        );

        const password = e.target["pw1"].value;
        const passwordConfirm = e.target["pw2"].value;

        if (password !== passwordConfirm) {
            setError("Passwords do not match");
            setStatus("Create");
            return;
        }

        register(password, passwordConfirm)
            .then(() => {
                setError(false);
                setStatus("Success");
                router.push("/");
            })
            .catch((err: any) => {
                setError(err.message);
            });
    };

    return (
        <Box>
            <div className="pt-6 pl-6" onClick={() => router.back()}>
                <ArrowBackIosIcon />
            </div>
            <CssBaseline />
            <div className=" flex min-h-full flex-col justify-center py-10 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <Avatar sx={{ mx: "auto", bgcolor: "primary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-primary">
                        Create your access key
                    </h2>
                </div>
                <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-dark-900 px-4 sm:rounded-lg sm:px-10">
                        <form
                            className="space-y-4"
                            method="POST"
                            onSubmit={(e) => handleSubmit(e)}
                        >
                            <div>
                                <label
                                    htmlFor="pw1"
                                    className="block text-sm font-medium text-primary"
                                >
                                    Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="pw1"
                                        name="pw1"
                                        type="password"
                                        autoComplete="new-password"
                                        required
                                        className="block w-full appearance-none rounded-md px-3 py-2 placeholder-gray-900 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="pw2"
                                    className="block text-sm font-medium text-primary"
                                >
                                    Confirm password
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="pw2"
                                        name="pw2"
                                        type="password"
                                        autoComplete="new-password"
                                        required
                                        className="block w-full appearance-none rounded-md px-3 py-2 placeholder-gray-900 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                                    />
                                </div>
                            </div>

                            {error && (
                                <Alert
                                    className="mb-1"
                                    severity="error"
                                    variant="filled"
                                >
                                    {error}
                                </Alert>
                            )}

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md border hover:cursor-pointer border-transparent bg-primary py-3 px-4 font-medium text-dark-900 shadow-sm hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2"
                                >
                                    {status}
                                </button>
                            </div>
                        </form>

                        <Typography
                            sx={{
                                color: "text.secondary",
                                mt: 1.5,
                            }}
                        >
                            You will retrieve a unique user ID
                        </Typography>

                        {/* <LoginProvider /> */}
                    </div>
                </div>
            </div>
        </Box>
    );
};

export default RegisterPage;
