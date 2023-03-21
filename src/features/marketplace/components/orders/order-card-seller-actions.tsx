import Contact from "@/types/Contact";
import Record from "@/types/Record";
import { Button, CardActions } from "@mui/material";
import useOrder from "features/marketplace/hooks/useOrder";
import { OrderRecord, OrderStatus } from "features/marketplace/types/Order";
import { ProductRecord } from "features/marketplace/types/Product";
import { create } from "lib/PlannedTransactions";
import { useRouter } from "next/router";

import { FC, ReactNode, useState } from "react";
import UpdateOrderMenu from "../misc/update-order-menu";
interface Props {
    order: OrderRecord;
}

type IncomingOrderCardAction = {
    status: OrderStatus;
    content: ReactNode | undefined;
};

const OrderCardSellerActions: FC<Props> = ({ order }) => {
    const { update, remove, deliver, loading } = useOrder();
    const [openEditMenu, setOpenEditMenu] = useState(false);
    const product = order.product;
    const contact = order.expand.contact as Record<Contact>;

    const { push } = useRouter();

    const planTransaction = () => {
        create({
            amount: product.price * order.quantity,
            contact: contact.id,
            info: order.message,
            type: order.payDirectly ? "Einnahme" : "Rechnung",
        });
    };

    const deleteButton = () => (
        <Button size="small" onClick={() => remove(order)} disabled={loading}>
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

                    <Button
                        size="small"
                        onClick={() => setOpenEditMenu(!openEditMenu)}
                        disabled={loading}
                    >
                        edit
                    </Button>
                    <UpdateOrderMenu
                        order={order}
                        open={openEditMenu}
                        setOpen={setOpenEditMenu}
                    />
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
                    <UpdateOrderMenu order={order} />
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

export default OrderCardSellerActions;
