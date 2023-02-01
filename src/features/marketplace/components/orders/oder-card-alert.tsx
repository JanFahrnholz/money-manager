import Contact from "@/types/Contact";
import { Alert, AlertTitle, Button } from "@mui/material";
import useUpdateProduct from "features/marketplace/hooks/useUpdateProduct";
import { OrderRecord } from "features/marketplace/types/Order";
import { ProductRecord } from "features/marketplace/types/Product";
import { useRouter } from "next/router";
import { FC } from "react";
interface Props {
    order: OrderRecord;
}
const OrderCardAlert: FC<Props> = ({ order }) => {
    const updateProduct = useUpdateProduct();
    const { reload } = useRouter();
    const product = order.expand.product as ProductRecord;
    const contact = order.expand.contact as Contact;

    const handleEnable = async () => {
        await updateProduct({ ...product, disabled: false });
        reload();
    };

    return (
        <>
            {product.disabled && (
                <Alert
                    sx={{ mb: 1 }}
                    severity="error"
                    variant="outlined"
                    action={
                        <Button
                            size="small"
                            color="error"
                            onClick={() => handleEnable()}
                        >
                            Enable
                        </Button>
                    }
                >
                    <AlertTitle>Product is disabled</AlertTitle>
                    Users cannot see their orders
                </Alert>
            )}
        </>
    );
};

export default OrderCardAlert;
