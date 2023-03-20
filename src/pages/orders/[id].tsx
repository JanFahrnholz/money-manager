import SubSiteHeader from "@/components/misc/SubSiteHeader";
import { Breadcrumbs, CssBaseline } from "@mui/material";
import OrderDetails from "features/marketplace/components/order-details";
import OrderDetailsSkeleton from "features/marketplace/components/order-details/skeleton";
import useOrder from "features/marketplace/hooks/useOrder";
import { OrderRecord } from "features/marketplace/types/Order";
import { client } from "lib/Pocketbase";
import { NextPage } from "next";
import Head from "next/head";
import { NextRouter, useRouter } from "next/router";
import { useEffect, useState } from "react";

import { Toaster } from "react-hot-toast";

const OrderDetailsPage: NextPage = () => {
    const [order, setOrder] = useState<OrderRecord | undefined | null>();
    const { orders } = useOrder();
    const router: NextRouter = useRouter();
    const query = router.query as { id: string };

    useEffect(() => {
        const fetch = async () => {
            if (!query.id) return;
            try {
                const order = await client
                    .collection("orders")
                    .getOne<OrderRecord>(query.id, {
                        expand: "product,contact",
                    });
                setOrder(order);
            } catch (error) {
                setOrder(null);
            }
        };
        fetch();
        client.collection("orders").subscribe(query.id, () => fetch());
    }, [query.id]);

    if (order === null) return <>error no order</>;

    return (
        <>
            <Head>
                <title>
                    MoneyManager - order details {order ? `- ${order.id}` : ""}
                </title>
            </Head>
            <CssBaseline />
            <SubSiteHeader title={"order details"}>
                {order === undefined ? (
                    <OrderDetailsSkeleton />
                ) : (
                    <OrderDetails order={order} />
                )}
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
