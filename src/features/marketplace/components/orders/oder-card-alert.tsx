import Contact from "@/types/Contact";
import { Alert, AlertTitle, Button } from "@mui/material";
import useUpdateProduct from "features/marketplace/hooks/useUpdateProduct";
import { OrderRecord } from "features/marketplace/types/Order";
import { ProductRecord } from "features/marketplace/types/Product";
import { userId } from "lib/Pocketbase";
import { useRouter } from "next/router";
import { FC } from "react";
interface Props {
    order: OrderRecord;
}
const OrderCardAlert: FC<Props> = ({ order }) => {
    const updateProduct = useUpdateProduct();
    const { reload } = useRouter();
    const contact = order.expand.contact as Contact;
    const isOwner = order.product.owner === userId;
    if (!isOwner) return <></>;

    const handleEnable = async () => {
        await updateProduct({ ...order.product, disabled: false });
        reload();
    };

    return (
        <>
            {order.product.disabled && (
                <Alert
                    sx={{ mb: 1 }}
                    severity="error"
                    variant="outlined"
                    action={
                        <Button size="small" onClick={() => handleEnable()}>
                            Enable
                        </Button>
                    }
                >
                    <AlertTitle>Product is disabled</AlertTitle>
                </Alert>
            )}
        </>
    );
};

export default OrderCardAlert;
