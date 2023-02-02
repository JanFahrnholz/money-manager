import { client } from "lib/Pocketbase";
import { useContext } from "react";
import { toast } from "react-hot-toast";
import { MarketplaceContext } from "../context";
import { ProductRecord, Product } from "../types/Product";

const useDeleteProduct = () => {
    const { setProducts } = useContext(MarketplaceContext);

    const remove = async (id: string) => {
        try {
            await client.collection("products").delete(id);
            setProducts((prev) => prev.filter((p) => p.id !== id));
            toast.success("product deleted");
        } catch (error) {
            toast.error("could not delete product");
        }
    };

    return remove;
};

export default useDeleteProduct;
