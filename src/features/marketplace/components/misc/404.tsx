import { Button, Container, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { FC } from "react";

const OrderNotFound: FC = () => {
    const { push } = useRouter();
    return (
        <>
            <main className="grid min-h-full place-items-center py-48 px-6 lg:px-8">
                <div className="text-center">
                    <Typography color={"primary"}>404</Typography>
                    <Typography variant="h4" sx={{ my: 4 }}>
                        Order not found
                    </Typography>
                    <p className="mt-6 text-base leading-7 text-gray-500">
                        Sorry, we couldn't find the page you're looking for.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Button
                            onClick={() => push("/orders")}
                            variant="contained"
                        >
                            Go to orders
                        </Button>
                        <Button onClick={() => push("/")} variant="outlined">
                            Go back home
                        </Button>
                    </div>
                </div>
            </main>
        </>
    );
};

export default OrderNotFound;
