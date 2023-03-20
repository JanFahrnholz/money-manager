import Contact from "@/types/Contact";
import { Card, Grid, Typography } from "@mui/material";
import { OrderRecord } from "features/marketplace/types/Order";
import { ProductRecord } from "features/marketplace/types/Product";
import { client } from "lib/Pocketbase";
import { FC } from "react";
import ReactTimeAgo from "react-time-ago";
import OrderCardAlert from "./oder-card-alert";
import OrderCardBuyerActions from "./order-card-buyer-actions";
import OrderCardDetails from "./order-card-details";
import OrderCardLocationInfo from "./order-card-location-info";
import OrderCardSellerActions from "./order-card-seller-actions";
import OrderCardStatus from "./order-card-status";

interface Props {
    order: OrderRecord;
}
const OrderCard: FC<Props> = ({ order }) => {
    const product = order.product;
    const contact = order.expand.contact as Contact;
    if (!product || !contact) return <></>;
    const id = client.authStore.model?.id;
    const isSeller = product.owner === id;
    const isBuyer = contact.user === id;

    return (
        <>
            <OrderCardAlert order={order} />
            <Card sx={{ backgroundColor: "secondary.main", mb: 2 }}>
                <Grid container>
                    <Grid xs={8} item>
                        <OrderCardDetails order={order} />
                    </Grid>
                    <Grid xs={4} item>
                        <OrderCardStatus order={order} />
                    </Grid>
                </Grid>
                <OrderCardLocationInfo order={order} />
                <Grid container>
                    <Grid item xs={8}>
                        {isSeller && <OrderCardSellerActions order={order} />}
                        {isBuyer && <OrderCardBuyerActions order={order} />}
                    </Grid>
                    <Grid item xs={4} sx={{ p: 1.5 }}>
                        <Typography
                            fontSize={"small"}
                            color="text.secondary"
                            textAlign={"right"}
                        >
                            updated{" "}
                            <ReactTimeAgo
                                date={new Date(order.updated)}
                                timeStyle="twitter"
                            />{" "}
                            ago
                        </Typography>
                    </Grid>
                </Grid>
            </Card>
        </>
    );
};

export default OrderCard;
