import { Button, Divider, List, ListItem, Typography } from "@mui/material";
import { Box } from "@mui/system";
import useProfile from "features/user-profiles/hooks/useProfile";
import { useRouter } from "next/router";
import { FC, useContext } from "react";
import { MarketplaceContext } from "../../context";
import CreateProduct from "../your-products/create-product";
import LinkedProductItem from "./linked-product-item";
import ProductItem from "../your-products/product-item";

const LinkedProducts: FC = () => {
    const { linkedProducts } = useContext(MarketplaceContext);
    const { push } = useRouter();

    return (
        <Box sx={{ pb: 18 }}>
            <Typography variant="h5" sx={{ mt: 1 }}>
                Linked products
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
                Products you can see and order from others
            </Typography>
            <Button
                sx={{ mt: 1 }}
                variant="contained"
                fullWidth
                onClick={() => push("/orders")}
            >
                orders
            </Button>
            {linkedProducts.length === 0 && <EmptyProducts />}
            {linkedProducts.length > 0 && (
                <List>
                    {linkedProducts.map((p) => (
                        <LinkedProductItem key={p.id} product={p} />
                    ))}
                </List>
            )}
        </Box>
    );
};

const EmptyProducts: FC = () => {
    return (
        <div className="p-4 text-center">
            <span className="text-sm font-medium">No products yet</span>
        </div>
    );
};

export default LinkedProducts;