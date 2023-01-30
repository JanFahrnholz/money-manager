import Profile from "@/types/Profile";
import { client } from "lib/Pocketbase";
import { useContext } from "react";
import { toast } from "react-hot-toast";
import { MarketplaceContext } from "../context";
import { ProductRecord } from "../types/Product";

const useUpdateProduct = () => {
    const { products, setProducts } = useContext(MarketplaceContext);

    const update = async (product: Partial<ProductRecord>) => {
        if (!product.id) return;
        try {
            const updated = await client
                .collection("products")
                .update<ProductRecord>(product.id, product);
            setProducts((prev) =>
                prev.map((p) => (p.id === updated.id ? updated : p))
            );
            toast.success("product updated");
        } catch (error) {
            toast.error("could not update product");
        }
    };

    return update;
};

export default useUpdateProduct;
