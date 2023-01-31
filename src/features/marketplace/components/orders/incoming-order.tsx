import { List, ListItem } from "@mui/material";
import useOrder from "features/marketplace/hooks/useOrder";
import { OrderRecord } from "features/marketplace/types/Order";
import { client } from "lib/Pocketbase";
import { FC, useEffect, useState } from "react";
import IncomingOrderCard from "./incoming-order-card";

const IncomingOrder: FC = () => {
    const [orders, setOrders] = useState<OrderRecord[]>([]);
    const id = client.authStore.model?.id;

    useEffect(() => {
        const fetch = async () => {
            if (!id) return;
            try {
                const orders = await client
                    .collection("orders")
                    .getFullList<OrderRecord>(10, {
                        filter: `product.owner.id="${id}"`,
                        expand: "product,contact",
                    });

                console.log(
                    "🚀 ~ file: incoming-order.tsx:13 ~ fetch ~ orders",
                    orders
                );
                setOrders(orders ? orders : []);
            } catch (error) {}
        };
        fetch();
    }, []);

    return (
        <>
            {orders.map((order) => (
                <IncomingOrderCard key={order.id} order={order} />
            ))}
        </>
    );
};

export default IncomingOrder;
