import Contact from "@/types/Contact";
import { CardActions, Button } from "@mui/material";
import useOrder from "features/marketplace/hooks/useOrder";
import { OrderRecord, OrderStatus } from "features/marketplace/types/Order";
import { ProductRecord } from "features/marketplace/types/Product";
import { create } from "lib/PlannedTransactions";
import { FC, ReactNode, useState } from "react";
import { toast } from "react-hot-toast";
import UpdateDeliveryMenu from "../misc/update-delivery-menu";
interface Props {
    order: OrderRecord;
}

type IncomingOrderCardAction = {
    status: OrderStatus;
    content: ReactNode | undefined;
};

const OrderCardSellerActions: FC<Props> = ({ order }) => {
    const { update, remove, deliver, loading } = useOrder();
    const product = order.expand.product as ProductRecord;
    const contact = order.expand.contact as Contact;

    const planTransaction = () => {
        create({
            amount: product.price * order.quantity,
            contact: contact.id,
            info: order.message,
            type: order.payDirectly ? "Einnahme" : "Rechnung",
        });
    };

    const deleteButton = () => (
        <Button
            size="small"
            onClick={() => remove(order.id)}
            disabled={loading}
        >
            delete order
        </Button>
    );
    const actions: IncomingOrderCardAction[] = [
        {
            status: "open",
            content: (
                <>
                    <Button
                        size="small"
                        onClick={() => update({ ...order, status: "accepted" })}
                        disabled={loading}
                    >
                        Accept
                    </Button>
                    <Button
                        size="small"
                        onClick={() => update({ ...order, status: "declined" })}
                        disabled={loading}
                    >
                        Decline
                    </Button>
                </>
            ),
        },
        {
            status: "accepted",
            content: (
                <>
                    <Button
                        size="small"
                        onClick={() => update({ ...order, status: "packaged" })}
                        disabled={loading}
                    >
                        Package
                    </Button>

                    <UpdateDeliveryMenu order={order} />
                </>
            ),
        },
        {
            status: "declined",
            content: deleteButton(),
        },
        {
            status: "packaged",
            content: (
                <>
                    <Button
                        size="small"
                        onClick={() => deliver(order)}
                        disabled={loading}
                    >
                        Deliver
                    </Button>
                    <UpdateDeliveryMenu order={order} />
                </>
            ),
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

    if (!currentAction || product.disabled) return <></>;
    if (currentAction.content === undefined) return <></>;

    return <CardActions>{currentAction.content}</CardActions>;
};

export default OrderCardSellerActions;
