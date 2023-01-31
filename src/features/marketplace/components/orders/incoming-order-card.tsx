import LinkedFrom from "@/components/misc/LinkedFrom";
import Contact from "@/types/Contact";
import {
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
import { FC } from "react";
import IncomingOrderCardActions from "./incoming-order-card-actions";
import IncomingOrderCardDetails from "./incoming-order-card-details";
import IncomingOrderCardStatus from "./incoming-order-card-status";
interface Props {
    order: OrderRecord;
}
const IncomingOrderCard: FC<Props> = ({ order }) => {
    const product = order.expand.product as ProductRecord;
    const contact = order.expand.contact as Contact;

    return (
        <Card sx={{ backgroundColor: "secondary.main", mb: 2 }}>
            <Grid container>
                <Grid xs={8} item>
                    <IncomingOrderCardDetails order={order} />
                </Grid>
                <Grid xs={4} item>
                    <IncomingOrderCardStatus order={order} />
                </Grid>
            </Grid>
            <IncomingOrderCardActions order={order} />
        </Card>
    );
};

export default IncomingOrderCard;
