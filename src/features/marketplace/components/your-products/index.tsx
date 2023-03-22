import { Button, Divider, List, ListItem, Typography } from "@mui/material";
import useProfile from "features/user-profiles/hooks/useProfile";
import { useRouter } from "next/router";
import { FC, useContext } from "react";
import { MarketplaceContext } from "../../context";
import useOrder from "../../hooks/useOrder";
import CreateProduct from "./create-product";
import LinkedProductItem from "../linked-products/linked-product-item";
import ProductItem from "./product-item";
import TotalStockValue from "../misc/total-stock-value";

const YourProducts: FC = () => {
    const { products } = useContext(MarketplaceContext);
    const profile = useProfile();

    const isSeller = profile ? profile.seller : false;
    if (!isSeller) return <></>;
    return (
        <>
            <Typography variant="h5" sx={{ mt: 1 }}>
                Your products
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
                Only linked contacts can see and order your products
            </Typography>
            {products.length === 0 && <EmptyProducts />}
            {products.length > 0 && (
                <List sx={{ py: 1 }}>
                    {products.map((p) => (
                        <ProductItem key={p.id} product={p} />
                    ))}
                </List>
            )}
            <TotalStockValue />
            <CreateProduct />
            <Divider sx={{ my: 2 }} />
        </>
    );
};

const EmptyProducts: FC = () => {
    return (
        <div className="p-4 text-center">
            <span className="text-sm font-medium">No products yet</span>
        </div>
    );
};

export default YourProducts;
