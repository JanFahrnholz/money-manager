import { Avatar, Button, Container, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import classes from "../../styles/dotted-background.module.css";
import LandingscreenRegisterForm from "./register-form";
import { AnimatePresence, motion } from "framer-motion";
import LandingscreenLoginForm from "./login-form";
import LoginIcon from "@mui/icons-material/Login";
import useLoggedIn from "../../hooks/useLoggedIn";

const Landingscreen: FC = () => {
    const [login, setLogin] = useState(false);
    const [finished, setFinished] = useState(false);
    const loggedIn = useLoggedIn();

    return (
        <>
            <Container
                sx={{
                    height: "100vh",
                    bgcolor: "background.default",
                }}
            >
                <div className={classes.wrapper}>
                    <div className={classes.bg} />
                </div>

                <Typography
                    variant="h3"
                    className="absolute left-1/2 top-1/4 center-anchor w-[95%] text-center"
                    sx={{
                        color: "primary.main",
                        fontWeight: 500,
                        textShadow: "rgba(0,0,0,0.3) 15px 20px 5px",
                    }}
                >
                    Money Manager
                </Typography>

                <AnimatePresence onExitComplete={() => setFinished(!finished)}>
                    {!login && !finished && (
                        <motion.div
                            key={"icon-register"}
                            style={{ display: "fixed", y: "100%" }}
                            initial={{ y: "-100%" }}
                            animate={{ y: "100%" }}
                            exit={{ y: "-100%" }}
                            transition={{ duration: 0.3 }}
                        >
                            <Avatar
                                sx={{
                                    mx: "auto",
                                    bgcolor: "primary.main",
                                    boxShadow: "rgba(0,0,0,0.3) 10px 10px 1px",
                                }}
                            >
                                <LockOutlinedIcon />
                            </Avatar>
                        </motion.div>
                    )}
                    {finished && login && (
                        <motion.div
                            key={"icon-login"}
                            style={{ display: "fixed", y: "100%" }}
                            initial={{ y: "-100%" }}
                            animate={{ y: "100%" }}
                            exit={{ y: "-100%" }}
                            transition={{ duration: 0.3 }}
                        >
                            <Avatar
                                sx={{
                                    mx: "auto",
                                    bgcolor: "primary.main",
                                    boxShadow: "rgba(0,0,0,0.3) 10px 10px 1px",
                                }}
                            >
                                <LoginIcon />
                            </Avatar>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="mt-[50vh] left-1/2">
                    <AnimatePresence>
                        {!login ? (
                            <motion.div
                                key={"register"}
                                initial={{ x: "-100%" }}
                                animate={{ x: "0%" }}
                                exit={{ x: "100%" }}
                                transition={{ duration: 0.5 }}
                            >
                                <LandingscreenRegisterForm />
                            </motion.div>
                        ) : (
                            <motion.div
                                key={"login"}
                                initial={{ x: "-100%" }}
                                animate={{ x: "0%" }}
                                exit={{ x: "100%" }}
                                transition={{ duration: 0.5 }}
                            >
                                <LandingscreenLoginForm />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="absolute bottom-10 left-1/2 center-anchor">
                    <Button
                        variant="outlined"
                        fullWidth
                        sx={{
                            fontSize: 14,
                            backgroundColor: "background.default",
                            boxShadow: "rgba(0,0,0,0.3) 10px 10px 1px",
                        }}
                        onClick={() => setLogin(!login)}
                    >
                        {!login ? "login" : "create id"}
                    </Button>
                </div>
            </Container>
        </>
    );
};

export default Landingscreen;
