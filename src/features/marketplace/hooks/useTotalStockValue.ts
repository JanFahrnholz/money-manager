import { useContext } from "react";
import { MarketplaceContext } from "../context";

const useTotalStockValue = () => {
    const { products } = useContext(MarketplaceContext);

    return products.reduce(
        (total, product) =>
            product.stock ? total + product.stock * product.price : total,
        0
    );
};
export default useTotalStockValue;
