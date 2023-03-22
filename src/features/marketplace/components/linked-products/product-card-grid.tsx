import { Grid } from "@mui/material";
import { ProductRecord } from "features/marketplace/types/Product";
import { FC } from "react";
import ProductCard from "./product-card";

interface ProductCardGridProps {
    products: ProductRecord[];
}

const ProductCardGrid: FC<ProductCardGridProps> = ({ products }) => {
    return (
        <>
            <Grid container spacing={1} sx={{ mt: 2 }}>
                {products.map((product) => (
                    <Grid item xs={6} key={product.id}>
                        <ProductCard product={product} />
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default ProductCardGrid;
