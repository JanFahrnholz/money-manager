import { client } from "lib/Pocketbase";
import { useContext } from "react";
import { toast } from "react-hot-toast";
import { MarketplaceContext } from "../context";
import { ProductRecord, Product } from "../types/Product";

const useCreateProduct = () => {
    const id = client.authStore.model?.id;
    const { setProducts } = useContext(MarketplaceContext);

    const create = async (input: Omit<Product, "owner">) => {
        if (!id) return false;

        const data = {
            ...input,
            owner: id,
        };

        try {
            const product = await client
                .collection("products")
                .create<ProductRecord>(data);
            setProducts((prev) => [...prev, product]);
            toast.success("product created");
            return true;
        } catch (error) {
            toast.error("could not create product");
        }
        return false;
    };

    return create;
};

export default useCreateProduct;
