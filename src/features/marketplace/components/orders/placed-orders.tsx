import { Typography, Divider, CircularProgress } from "@mui/material";
import { OrderRecord } from "features/marketplace/types/Order";
import useProfile from "features/user-profiles/hooks/useProfile";
import { client } from "lib/Pocketbase";
import { FC, useEffect, useState } from "react";
import OrderCard from "./order-card";

const PlacedOrders: FC = () => {
    const [orders, setOrders] = useState<OrderRecord[]>(undefined!);
    const { profile } = useProfile();
    const id = client.authStore.model?.id;

    useEffect(() => {
        const fetch = async () => {
            if (!id) return;
            try {
                const orders = await client
                    .collection("orders")
                    .getFullList<OrderRecord>(10, {
                        filter: `contact.user.id="${id}"`,
                        expand: "product,contact",
                        sort: "-updated",
                    });
                setOrders(orders ? orders : []);
            } catch (error) {}
        };
        fetch();
    }, []);

    return (
        <>
            <Typography variant="h5" sx={{ mt: 1 }}>
                Your placed orders
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {orders === undefined && (
                <div className="text-center p-4">
                    <CircularProgress />
                </div>
            )}

            {orders !== undefined && (
                <>
                    {orders.length === 0 && (
                        <div className="text-center p-4">No orders yet</div>
                    )}
                    {orders.map((order) => (
                        <OrderCard key={order.id} order={order} />
                    ))}
                </>
            )}
        </>
    );
};

export default PlacedOrders;
