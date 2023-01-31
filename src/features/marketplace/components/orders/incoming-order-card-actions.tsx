import { CardActions, Button } from "@mui/material";
import { OrderRecord, OrderStatus } from "features/marketplace/types/Order";
import { FC, ReactNode } from "react";
interface Props {
    order: OrderRecord;
}

type IncomingOrderCardAction = {
    status: OrderStatus;
    content: ReactNode;
};

const IncomingOrderCardActions: FC<Props> = ({ order }) => {
    const actions: IncomingOrderCardAction[] = [
        {
            status: "open",
            content: (
                <>
                    <Button size="small">Accept</Button>
                    <Button size="small">Decline</Button>
                </>
            ),
        },
        {
            status: "accepted",
            content: (
                <>
                    <Button size="small">Package</Button>
                </>
            ),
        },
        {
            status: "declined",
            content: (
                <>
                    <Button size="small">Delete</Button>
                </>
            ),
        },
        {
            status: "packaged",
            content: (
                <>
                    <Button size="small">Deliver</Button>
                </>
            ),
        },
        {
            status: "delivered",
            content: (
                <>
                    <Button size="small">Delete order</Button>
                </>
            ),
        },
    ];

    return (
        <CardActions>
            {actions.find((o) => o.status === order.status)?.content}
        </CardActions>
    );
};

export default IncomingOrderCardActions;
