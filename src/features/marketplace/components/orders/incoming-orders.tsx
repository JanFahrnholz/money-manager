import { CircularProgress, Divider, Typography } from "@mui/material";
import { MarketplaceContext } from "features/marketplace/context";
import useProfile from "features/user-profiles/hooks/useProfile";
import { client } from "lib/Pocketbase";
import { FC, useContext } from "react";
import OrderCard from "./order-card";

const IncomingOrders: FC = () => {
    const { profile } = useProfile();
    const id = client.authStore.model?.id;
    const { orders } = useContext(MarketplaceContext);

    const header = () => (
        <>
            <Typography variant="h5" sx={{ mt: 1 }}>
                Incoming orders
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

    const incomingOrders = orders
        .filter((order) => order.expand.product.owner === id)
        .sort((a, b) => {
            const dateA = new Date(a.updated);
            const dateB = new Date(b.updated);
            return dateA > dateB ? -1 : dateA > dateB ? 1 : 0;
        });

    return (
        <>
            {header()}
            {incomingOrders.length === 0 && noOrders()}
            {incomingOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
            ))}
        </>
    );
};

export default IncomingOrders;
