import SubSiteHeader from "@/components/misc/SubSiteHeader";
import { Box, CssBaseline } from "@mui/material";
import IncomingOrder from "features/marketplace/components/orders/incoming-order";
import useOrder from "features/marketplace/hooks/useOrder";
import { NextPage } from "next";

const Orders: NextPage = () => {
    return (
        <>
            <CssBaseline />
            <SubSiteHeader title="my orders">
                <IncomingOrder />
            </SubSiteHeader>
        </>
    );
};

export default Orders;
