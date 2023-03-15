import SubSiteHeader from "@/components/misc/SubSiteHeader";
import { Box, Container, CssBaseline } from "@mui/material";
import Orders from "features/marketplace/components/orders";

import useOrder from "features/marketplace/hooks/useOrder";
import { NextPage } from "next";
import { Toaster } from "react-hot-toast";

const OrdersPage: NextPage = () => {
    return (
        <>
            <CssBaseline />
            <SubSiteHeader title="orders">
                <Container sx={{ p: 1 }}>
                    <Orders />
                </Container>
            </SubSiteHeader>
            <Toaster
                toastOptions={{
                    duration: 2000,
                }}
            />
        </>
    );
};

export default OrdersPage;
