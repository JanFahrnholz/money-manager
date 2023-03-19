import SwipeableViews from "@/components/swipeable-views";
import SwipeableViewsDefaultTabs from "@/components/swipeable-views/default-tabs";
import Slide from "@/components/swipeable-views/slide";
import LockIcon from "@mui/icons-material/Lock";
import { Button, Typography } from "@mui/material";
import ChatComponent from "features/chats/components/chat";
import useChat from "features/chats/hooks/useChat";
import { OrderRecord } from "features/marketplace/types/Order";
import useSetting from "features/user-settings/hooks/useSetting";
import { FC } from "react";
import ReactTimeAgo from "react-time-ago";
import OrderCardStatus from "../orders/order-card-status";
import OrderDetailsTabContent from "./order-details";
interface OrderDetailsPageProps {
    order: OrderRecord;
}

const OrderDetails: FC<OrderDetailsPageProps> = ({ order }) => {
    const chatsEnabled: boolean = useSetting("enableChats");

    const tabs: Slide[] = [
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
            <SwipeableViews
                slides={tabs}
                tabs={(slides, currentSlide, setCurrentSlide) => (
                    <SwipeableViewsDefaultTabs
                        slides={slides}
                        currentSlide={currentSlide}
                        setCurrentSlide={setCurrentSlide}
                    />
                )}
            />
        </>
    );
};

export default OrderDetails;
