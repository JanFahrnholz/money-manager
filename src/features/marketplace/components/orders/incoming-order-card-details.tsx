import LinkedFrom from "@/components/misc/LinkedFrom";
import Contact from "@/types/Contact";
import { CardContent, Typography } from "@mui/material";
import { OrderRecord } from "features/marketplace/types/Order";
import { ProductRecord } from "features/marketplace/types/Product";
import { FC } from "react";
interface Props {
    order: OrderRecord;
}
const IncomingOrderCardDetails: FC<Props> = ({ order }) => {
    const product = order.expand.product as ProductRecord;
    const contact = order.expand.contact as Contact;

    return (
        <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                order from {contact.name} or{" "}
                <LinkedFrom owner={contact.user} asText />
            </Typography>
            <Typography variant="h5" component="div" sx={{ my: 1 }}>
                {product.name} {order.quantity}
                {product.unit}
            </Typography>
            <Typography variant="body2">
                Price: {order.quantity * product.price}€ ({product.price}€/
                {product.unit})
            </Typography>

            <Typography variant="body1" sx={{ mt: 1 }}>
                {order.message}
            </Typography>
        </CardContent>
    );
};

export default IncomingOrderCardDetails;
