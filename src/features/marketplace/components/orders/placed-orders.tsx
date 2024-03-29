import { CircularProgress, Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { MarketplaceContext } from "features/marketplace/context";
import { client } from "lib/Pocketbase";
import { FC, useContext } from "react";
import OrderCard from "./order-card";

const PlacedOrders: FC = () => {
    const id = client.authStore.model?.id;
    const { orders } = useContext(MarketplaceContext);

    const header = () => (
        <>
            <Typography variant="h5" sx={{ mt: 1 }}>
                Your placed orders
            </Typography>
            <Divider sx={{ mb: 2 }} />
        </>
    );

    const loading = () => (
        <div className="text-center p-4">
            <CircularProgress />
        </div>
    );

    const noOrders = () => <div className="text-center p-4">No orders yet</div>;

    if (!id || orders === undefined)
        return (
            <>
                {header()}
                {loading()}
            </>
        );

    const placedOrders = orders
        .filter((order) => order.expand.contact.user === id)
        .sort((a, b) => {
            const dateA = new Date(a.updated);
            const dateB = new Date(b.updated);
            return dateA > dateB ? -1 : dateA > dateB ? 1 : 0;
        });

    return (
        <>
            {header()}
            {placedOrders.length === 0 && noOrders()}
            {placedOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
            ))}
            <Box sx={{ mb: 12 }} />
        </>
    );
};

export default PlacedOrders;
