import { Badge } from "@mui/material";
import { MarketplaceContext } from "features/marketplace/context";
import useProfile from "features/user-profiles/hooks/useProfile";
import { client } from "lib/Pocketbase";
import { FC, ReactNode, useContext } from "react";

interface Props {
    children: ReactNode;
}

const IncomingOrderCountBadge: FC<Props> = ({ children }) => {
    const { orders } = useContext(MarketplaceContext);
    const id = client.authStore.model?.id;
    const { profile } = useProfile();
    if (!profile?.seller) return <>{children}</>;

    const incomingOrders = orders.filter(
        (order) => order.expand.product.owner === id
    );

    return (
        <Badge
            badgeContent={incomingOrders.length}
            color="error"
            sx={{ width: "100%" }}
        >
            {children}
        </Badge>
    );
};

export default IncomingOrderCountBadge;
