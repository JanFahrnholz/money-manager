import { Button, CardActions } from "@mui/material";
import useOrder from "features/marketplace/hooks/useOrder";
import { OrderRecord, OrderStatus } from "features/marketplace/types/Order";
import { useRouter } from "next/router";
import { FC, ReactNode } from "react";
interface Props {
    order: OrderRecord;
}

type IncomingOrderCardAction = {
    status: OrderStatus;
    content: ReactNode | undefined;
};

const OrderCardBuyerActions: FC<Props> = ({ order }) => {
    const { update, remove, loading } = useOrder();
    const { push } = useRouter();

    const cancelButton = () => (
        <Button
            size="small"
            onClick={() => update({ ...order, status: "canceled" })}
            disabled={loading}
        >
            cancel order
        </Button>
    );
    const deleteButton = () => (
        <Button size="small" onClick={() => remove(order)} disabled={loading}>
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

    return (
        <CardActions>
            {currentAction.content}
            <Button
                size="small"
                onClick={() => push(`/orders/${order.id}`)}
                disabled={loading}
            >
                details
            </Button>
        </CardActions>
    );
};

export default OrderCardBuyerActions;
