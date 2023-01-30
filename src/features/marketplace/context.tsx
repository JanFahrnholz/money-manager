import { client } from "lib/Pocketbase";
import { Props } from "next/script";
import {
    createContext,
    Dispatch,
    FC,
    SetStateAction,
    useEffect,
    useState,
} from "react";
import { ProductRecord } from "./types/Product";

type ContextProps = {
    products: ProductRecord[];
    setProducts: Dispatch<SetStateAction<ProductRecord[]>>;
    linkedProducts: ProductRecord[];
};
export const MarketplaceContext = createContext<ContextProps>(undefined!);

const MarketplaceContextProvider: FC<Props> = (props) => {
    const [products, setProducts] = useState<ProductRecord[]>([]);
    const [linkedProducts, setLinkedProducts] = useState<ProductRecord[]>([]);
    const id = client.authStore.model?.id;
    useEffect(() => {
        const fetch = async () => {
            const products = await client
                .collection("products")
                .getFullList<ProductRecord>();
            const result = products.reduce(
                (res, item) => {
                    res[item.owner === id ? "a" : "b"].push(item);
                    return res;
                },
                { a: [] as ProductRecord[], b: [] as ProductRecord[] }
            );
            setProducts(result.a);
            setLinkedProducts(result.b);
        };
        fetch();
    }, []);

    return (
        <MarketplaceContext.Provider
            value={{
                products,
                setProducts,
                linkedProducts,
            }}
        >
            {props.children}
        </MarketplaceContext.Provider>
    );
};

export default MarketplaceContextProvider;
