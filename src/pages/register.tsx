import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import {
    Alert,
    Avatar,
    CircularProgress,
    CssBaseline,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { FC, ReactElement, useContext, useState } from "react";
import { Account, Client } from "appwrite";
import { useRouter } from "next/router";
import LoginProvider from "../components/misc/LoginProviders";
import { UserContext } from "../context/UserContext";
import Link from "next/link";

const RegisterPage: FC = () => {
    const [error, setError] = useState<string>();
    const [status, setStatus] = useState<any>("Sign up");
    const router = useRouter();
    const { register } = useContext(UserContext);

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        setStatus(
            <CircularProgress sx={{ color: "secondary.main" }} size={14} />
        );

        const name = e.target["name"].value;
        const email = e.target["email"].value;
        const pw1 = e.target["pw1"].value;
        const pw2 = e.target["pw2"].value;

        if (pw1 !== pw2) {
            setError("Passwords do not match");
            return;
        }

        const res = await register(name, email, pw1);
        setError(res);
        setStatus("Sign up");

        if (!res) router.push("/");
    };

    return (
        <Box>
            <CssBaseline />
            <div className="flex min-h-full flex-col justify-center py-10 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <Avatar sx={{ mx: "auto", bgcolor: "primary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-primary">
                        Sign up your account
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
                                    htmlFor="name"
                                    className="block text-sm font-medium text-primary"
                                >
                                    Name
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        autoComplete="name"
                                        required
                                        className="block w-full appearance-none rounded-md border px-3 py-2 placeholder-gray-900 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-primary"
                                >
                                    Email address
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="block w-full appearance-none rounded-md border px-3 py-2 placeholder-gray-900 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                                    />
                                </div>
                            </div>

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

                        <Link href={"/login"}>
                            <Typography
                                sx={{
                                    color: "text.secondary",
                                    mt: 1.5,
                                    textDecoration: "underline",
                                }}
                            >
                                Already registered? Login
                            </Typography>
                        </Link>

                        {/* <LoginProvider /> */}
                    </div>
                </div>
            </div>
        </Box>
    );
};

export default RegisterPage;
