import useProfile from "features/user-profiles/hooks/useProfile";
import { FC } from "react";
import IncomingOrders from "./incoming-orders";
import PlacedOrders from "./placed-orders";

const Orders: FC = () => {
    const { profile } = useProfile();

    return (
        <>
            {profile?.seller && <IncomingOrders />}
            <PlacedOrders />
        </>
    );
};

export default Orders;
