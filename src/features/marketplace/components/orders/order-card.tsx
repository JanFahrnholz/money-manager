import LinkedFrom from "@/components/misc/LinkedFrom";
import Contact from "@/types/Contact";
import {
    Alert,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Grid,
    ListItem,
    ListItemText,
    Step,
    StepConnector,
    StepLabel,
    Stepper,
    Typography,
} from "@mui/material";
import { minHeight } from "@mui/system";
import { OrderRecord } from "features/marketplace/types/Order";
import { ProductRecord } from "features/marketplace/types/Product";
import { client } from "lib/Pocketbase";
import { FC } from "react";
import OrderCardSellerActions from "./order-card-seller-actions";
import OrderCardBuyerActions from "./order-card-buyer-actions";
import OrderCardDetails from "./order-card-details";
import OrderCardStatus from "./order-card-status";
import useOrder from "features/marketplace/hooks/useOrder";
import useUpdateProduct from "features/marketplace/hooks/useUpdateProduct";
import OrderCardAlert from "./oder-card-alert";

interface Props {
    order: OrderRecord;
}
const OrderCard: FC<Props> = ({ order }) => {
    const { remove } = useOrder();
    const product = order.expand.product as ProductRecord;
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
                {isSeller && <OrderCardSellerActions order={order} />}
                {isBuyer && <OrderCardBuyerActions order={order} />}
            </Card>
        </>
    );
};

export default OrderCard;
