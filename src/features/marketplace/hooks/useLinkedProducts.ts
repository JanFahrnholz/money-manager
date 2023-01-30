import { client } from "lib/Pocketbase";
import { useEffect, useState } from "react";
import { ProductRecord } from "../types/Product";

const useLinkedProduct = () => {
    const [products, setProducts] = useState<ProductRecord[]>([]);
    const fetch = async () => {
        client.collection("products").getFullList(10, { filter: "" });
    };
    fetch();

    return products;
};

export default useLinkedProduct;
