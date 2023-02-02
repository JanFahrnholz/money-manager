import { Alert } from "@mui/material";
import { OrderRecord } from "features/marketplace/types/Order";
import { FC } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { parseDeliveryDate } from "lib/Formatter";
interface Props {
    order: OrderRecord;
}
const OrderCardLocationInfo: FC<Props> = ({ order }) => {
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
            delivery {parseDeliveryDate(order.when)}{" "}
            {order.location && `at ${order.location}`}
        </Alert>
    );
};

export default OrderCardLocationInfo;
