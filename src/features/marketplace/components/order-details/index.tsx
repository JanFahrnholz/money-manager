import SwipeableTabs from "@/components/swipeable-tabs";
import Tab from "@/components/swipeable-tabs/tab";
import ChatComponent from "features/chats/components/chat";
import { OrderRecord } from "features/marketplace/types/Order";
import useSetting from "features/user-settings/hooks/useSetting";
import { FC } from "react";
import OrderCardStatus from "../orders/order-card-status";
import LockIcon from "@mui/icons-material/Lock";
import OrderDetailsTabContent from "./order-details";
interface OrderDetailsPageProps {
    order: OrderRecord;
}

const OrderDetails: FC<OrderDetailsPageProps> = ({ order }) => {
    const chatsEnabled: boolean = useSetting("enableChats");

    const tabs: Tab[] = [
        {
            id: 0,
            title: "Details",
            content: <OrderDetailsTabContent order={order} />,
        },
        {
            id: 1,
            title: "Chat",
            icon: chatsEnabled ? undefined : <LockIcon sx={{ m: 0, p: 0 }} />,
            iconPosition: "end",
            content: <ChatComponent id={order.chat} />,
        },
    ];
    return (
        <>
            <OrderCardStatus order={order} horizontal />
            <SwipeableTabs tabs={tabs} />
        </>
    );
};

export default OrderDetails;
