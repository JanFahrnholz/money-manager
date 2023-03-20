import Contact from "@/types/Contact";
import { client } from "lib/Pocketbase";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { OrderRecord } from "../types/Order";
import { ProductRecord } from "../types/Product";
import useUpdateProduct from "./useUpdateProduct";

import Transaction from "@/types/Transaction";
import { create as createTransaction } from "lib/Transactions";
import { useContext, useState } from "react";
import { MarketplaceContext } from "../context";
import useChat from "features/chats/hooks/useChat";

const useOrder = () => {
    const id = client.authStore.model?.id;
    const { setOrders, orders, loading, setLoading } =
        useContext(MarketplaceContext);

    const updateProduct = useUpdateProduct();
    const chat = useChat();

    const create = async (
        order: Partial<OrderRecord>,
        product: ProductRecord
    ) => {
        if (!id) return;
        setLoading(true);

        try {
            const contact = await client
                .collection("contacts")
                .getFirstListItem<Contact>(
                    `user.id="${id}" && owner.id="${product.owner}"`
                );
            const newOrder = await client
                .collection("orders")
                .create<OrderRecord>(
                    {
                        ...order,
                        status: "open",
                        product,
                        contact: contact.id,
                    },
                    { expand: "product,contact" }
                );
            setOrders((prev) => [newOrder, ...prev]);
            toast.success("Your order has been placed");
        } catch (error) {
            toast.error("Couldnt place order");
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const update = async (order: Partial<OrderRecord>) => {
        if (!order.id) return;
        setLoading(true);
        try {
            const newOrder = await client
                .collection("orders")
                .update<OrderRecord>(order.id, order, {
                    expand: "product,contact",
                });

            setOrders((prev) =>
                prev.map((order) =>
                    order.id === newOrder.id ? newOrder : order
                )
            );
            toast.success("order updated");
        } catch (error) {
            toast.error("could not update orders");
        } finally {
            setLoading(false);
        }
    };

    const remove = async (order: OrderRecord) => {
        setLoading(true);
        try {
            await client.collection("orders").delete(order.id);
            await chat.remove(order.chat);
            toast.success("order deleted");
            setOrders((prev) => prev.filter((o) => o.id !== order.id));
        } catch (error) {
            toast.error("could not delete order");
        } finally {
            setLoading(false);
        }
    };

    const deliver = async (order: OrderRecord) => {
        if (order.status !== "packaged") return;
        setLoading(true);

        const product = order.expand.product as ProductRecord;
        const contact = order.expand.contact as Contact;
        if (!product || !contact) return;
        const stock = product.stock ? product.stock - order.quantity : 0;

        const transaction: Transaction = {
            amount: product.price * order.quantity,
            contact: contact.id,
            info: order.message,
            type: order.payDirectly ? "Einnahme" : "Rechnung",
            owner: product.owner,
            date: new Date(),
        };

        try {
            await updateProduct({ ...product, stock });
            await createTransaction(transaction);
            await update({ ...order, status: "delivered" });
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    return { orders, create, update, remove, deliver, loading };
};

export default useOrder;
