import SubSiteHeader from "@/components/misc/SubSiteHeader";
import { Button, CssBaseline } from "@mui/material";
import ChatComponent from "features/chats/components/chat";
import useChat from "features/chats/hooks/useChat";
import OrderCard from "features/marketplace/components/orders/order-card";
import { OrderRecord } from "features/marketplace/types/Order";
import { client } from "lib/Pocketbase";
import { NextPage } from "next";
import { NextRouter, useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { Toaster } from "react-hot-toast";
import Orders from ".";

const OrderDetailsPage: NextPage = () => {
    const [order, setOrder] = useState<OrderRecord | undefined>();
    const router: NextRouter = useRouter();
    const query = router.query as { id: string };

    useEffect(() => {
        const fetch = async () => {
            if (!query.id) return;
            try {
                const order = await client
                    .collection("orders")
                    .getOne<OrderRecord>(query.id);
                setOrder(order);
            } catch (error) {}
        };
        fetch();
    }, [query.id]);

    if (!order) return <>error no order</>;

    return (
        <>
            <CssBaseline />
            <SubSiteHeader title={`order details`}>
                {/* order details {order.quantity} */}
                <OrderCard order={order} />
                <ChatComponent id={order.chat} />
            </SubSiteHeader>
            <Toaster
                toastOptions={{
                    duration: 2000,
                }}
            />
        </>
    );
};

export default OrderDetailsPage;
