import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Alert } from "@mui/material";
import { OrderRecord } from "features/marketplace/types/Order";
import { parseDeliveryDate } from "lib/Formatter";
import { FC } from "react";
interface Props {
    order: OrderRecord;
}
const OrderCardDeliveryInfo: FC<Props> = ({ order }) => {
    if (order.status === "delivered") return <></>;
    if (order.status === "canceled") return <></>;
    if (order.status === "declined") return <></>;

    return (
        <Alert
            icon={<LocationOnIcon />}
            severity="info"
            variant="outlined"
            sx={{ m: 1, mt: 0 }}
        >
            delivery {parseDeliveryDate(order.when)}
            {order.location && `, ${order.location}`}
        </Alert>
    );
};

export default OrderCardDeliveryInfo;
