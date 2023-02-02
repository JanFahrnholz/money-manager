import LinkedFrom from "@/components/misc/LinkedFrom";
import Contact from "@/types/Contact";
import { CardContent, Typography } from "@mui/material";
import { OrderRecord } from "features/marketplace/types/Order";
import { ProductRecord } from "features/marketplace/types/Product";
import { client } from "lib/Pocketbase";
import { FC } from "react";
interface Props {
    order: OrderRecord;
}
const OrderCardDetails: FC<Props> = ({ order }) => {
    const product = order.expand.product as ProductRecord;
    const contact = order.expand.contact as Contact;
    const id = client.authStore.model?.id;
    const isOwner = product.owner === id;

    const orderFrom = isOwner ? (
        <>
            order from {contact.name}{" "}
            <LinkedFrom owner={contact.user} asText disableId />
        </>
    ) : (
        <>
            your order at <LinkedFrom owner={product.owner} asText />
        </>
    );

    return (
        <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                {orderFrom}
            </Typography>
            <Typography variant="h5" component="div" sx={{ my: 1 }}>
                {product.name} {order.quantity}
                {product.unit}
            </Typography>
            <Typography variant="body2">
                Price: {order.quantity * product.price}€ ({product.price}€/
                {product.unit}) {!order.payDirectly && "not payed directly"}
            </Typography>

            <Typography variant="body1" sx={{ mt: 1 }}>
                {order.message}
            </Typography>
        </CardContent>
    );
};

export default OrderCardDetails;