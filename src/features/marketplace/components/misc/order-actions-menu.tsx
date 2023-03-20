import CloseIcon from "@mui/icons-material/Close";
import Edit from "@mui/icons-material/Edit";
import {
    Backdrop,
    Box,
    SpeedDial,
    SpeedDialAction,
    SpeedDialIcon,
    Zoom,
} from "@mui/material";
import { OrderRecord, OrderStatus } from "features/marketplace/types/Order";
import { OrderAction } from "features/marketplace/types/OrderAction";

import { FC, useState } from "react";
interface OrderActionsMenuProps {
    order: OrderRecord;
    active: boolean;
}
import CheckIcon from "@mui/icons-material/Check";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import MoveToInboxIcon from "@mui/icons-material/MoveToInbox";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import { userId } from "lib/Pocketbase";
import useOrder from "features/marketplace/hooks/useOrder";
import { useRouter } from "next/router";

const OrderActionsMenu: FC<OrderActionsMenuProps> = ({ order, active }) => {
    const [open, setOpen] = useState(false);
    const isOwner = order.product.owner === userId;
    const { update, remove, deliver, loading } = useOrder();
    const { push } = useRouter();

    const handleClose = (action?: OrderAction) => {
        if (action?.action) action.action();
        setOpen(false);
    };

    const isOrderActionActive = (
        activeOn: OrderStatus[],
        ownerAction?: boolean
    ) => {
        if (ownerAction === true && !isOwner) return false;
        let active = false;
        activeOn.forEach((status) => {
            active = order.status === status;
        });
        return active;
    };

    const actions: OrderAction[] = [
        {
            label: "accept",
            icon: <CheckIcon />,
            active: isOrderActionActive(["open"], true),
            action: () => update({ ...order, status: "accepted" }),
        },
        {
            label: "decline",
            icon: <DoDisturbIcon />,
            active: isOrderActionActive(["open"], true),
            action: () => update({ ...order, status: "declined" }),
        },
        {
            label: "package",
            icon: <MoveToInboxIcon />,
            active: isOrderActionActive(["accepted"], true),
            action: () => update({ ...order, status: "packaged" }),
        },
        {
            label: "deliver",
            icon: <LocalShippingIcon />,
            active: isOrderActionActive(["packaged"], true),
            action: () => deliver(order),
        },
        {
            label: "cancel",
            icon: <CancelIcon />,
            active:
                order.status !== "canceled" &&
                order.status !== "declined" &&
                order.status !== "delivered",
            action: () => update({ ...order, status: "canceled" }),
        },
        {
            label: "delete",
            icon: <DeleteIcon />,
            active:
                order.status === "canceled" ||
                order.status === "declined" ||
                order.status === "delivered",
            action: async () => {
                await remove(order);
                push("/");
            },
        },
    ];

    return (
        <>
            <Box>
                <Backdrop open={open} sx={{ zIndex: 1000 }} />
                <Zoom in={active}>
                    <SpeedDial
                        ariaLabel="order action"
                        sx={{ position: "absolute", bottom: 32, right: 16 }}
                        icon={
                            <SpeedDialIcon
                                icon={<Edit />}
                                openIcon={<CloseIcon />}
                            />
                        }
                        onClose={() => handleClose()}
                        onOpen={() => setOpen(!open)}
                        open={open}
                    >
                        {actions.reverse().map((action) => {
                            if (!action.active) return;
                            return (
                                <SpeedDialAction
                                    key={action.label}
                                    icon={action.icon}
                                    tooltipTitle={action.label}
                                    tooltipOpen
                                    onClick={() => handleClose(action)}
                                />
                            );
                        })}
                    </SpeedDial>
                </Zoom>
            </Box>
        </>
    );
};

export default OrderActionsMenu;
