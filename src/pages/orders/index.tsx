import SubSiteHeader from "@/components/misc/SubSiteHeader";
import { Box, Container, CssBaseline } from "@mui/material";
import Orders from "features/marketplace/components/orders";

import useOrder from "features/marketplace/hooks/useOrder";
import { NextPage } from "next";
import Head from "next/head";
import { Toaster } from "react-hot-toast";

const OrdersPage: NextPage = () => {
    return (
        <>
            <Head>
                <title>MoneyManager - Orders</title>
            </Head>
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
