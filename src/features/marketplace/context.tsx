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
import { OrderRecord } from "./types/Order";
import { ProductRecord } from "./types/Product";
const _ = require("lodash");

type ContextProps = {
    products: ProductRecord[];
    setProducts: Dispatch<SetStateAction<ProductRecord[]>>;
    linkedProducts: ProductRecord[];
    orders: OrderRecord[];
    setOrders: Dispatch<SetStateAction<OrderRecord[]>>;
};

export const MarketplaceContext = createContext<ContextProps>(undefined!);

const MarketplaceContextProvider: FC<Props> = (props) => {
    const [products, setProducts] = useState<ProductRecord[]>([]);
    const [linkedProducts, setLinkedProducts] = useState<ProductRecord[]>([]);
    const [orders, setOrders] = useState<OrderRecord[]>(undefined!);
    const id = client.authStore.model?.id;

    useEffect(() => {
        const fetchProducts = async () => {
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
        const fetchOrders = async () => {
            try {
                const orders = await client
                    .collection("orders")
                    .getFullList<OrderRecord>(10, {
                        expand: "product,contact",
                        sort: "-updated",
                    });
                setOrders(orders ? orders : []);
            } catch (error) {}
        };
        fetchProducts();
        fetchOrders();
        client.collection("orders").subscribe("*", () => fetchOrders());
    }, []);

    return (
        <MarketplaceContext.Provider
            value={{
                products,
                setProducts,
                linkedProducts,
                orders,
                setOrders,
            }}
        >
            {props.children}
        </MarketplaceContext.Provider>
    );
};

export default MarketplaceContextProvider;
