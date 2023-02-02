import LinkedFrom from "@/components/misc/LinkedFrom";
import Contact from "@/types/Contact";
import { CardActions, Button, Typography } from "@mui/material";
import useOrder from "features/marketplace/hooks/useOrder";
import { OrderRecord, OrderStatus } from "features/marketplace/types/Order";
import { ProductRecord } from "features/marketplace/types/Product";
import { FC, ReactNode } from "react";
interface Props {
    order: OrderRecord;
}

type IncomingOrderCardAction = {
    status: OrderStatus;
    content: ReactNode | undefined;
};

const OrderCardBuyerActions: FC<Props> = ({ order }) => {
    const { update, remove } = useOrder();
    const product = order.expand.product as ProductRecord;
    const contact = order.expand.contact as Contact;

    const cancelButton = () => (
        <Button
            size="small"
            onClick={() => update({ ...order, status: "canceled" })}
        >
            cancel order
        </Button>
    );
    const deleteButton = () => (
        <Button size="small" onClick={() => remove(order.id)}>
            delete order
        </Button>
    );

    const actions: IncomingOrderCardAction[] = [
        {
            status: "open",
            content: cancelButton(),
        },
        {
            status: "accepted",
            content: cancelButton(),
        },
        {
            status: "declined",
            content: deleteButton(),
        },
        {
            status: "packaged",
            content: cancelButton(),
        },
        {
            status: "delivered",
            content: deleteButton(),
        },
        {
            status: "canceled",
            content: deleteButton(),
        },
    ];

    const currentAction = actions.find((o) => o.status === order.status);

    if (!currentAction) return <></>;
    if (currentAction.content === undefined) return <></>;

    return <CardActions>{currentAction.content}</CardActions>;
};

export default OrderCardBuyerActions;