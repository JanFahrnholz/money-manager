import Contact from "@/types/Contact";
import { client } from "lib/Pocketbase";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { OrderRecord } from "../types/Order";
import { ProductRecord } from "../types/Product";
import useUpdateProduct from "./useUpdateProduct";

import { create as createTransaction } from "lib/Transactions";
import Transaction from "@/types/Transaction";

const useOrder = () => {
    const id = client.authStore.model?.id;
    const { reload } = useRouter();
    const updateProduct = useUpdateProduct();
    const create = async (
        product: ProductRecord,
        quantity: number,
        message: string,
        payDirectly: boolean
    ) => {
        if (!id) return;
        try {
            const contact = await client
                .collection("contacts")
                .getFirstListItem<Contact>(
                    `user.id="${id}" && owner.id="${product.owner}"`
                );
            console.log(contact, id, quantity);
            await client.collection("orders").create({
                product: product.id,
                contact: contact.id,
                quantity,
                message,
                status: "open",
                payDirectly,
            });
            toast.success("Your order has been placed");
        } catch (error) {
            toast.error("Couldnt place order");
            console.log(error);
        }
    };

    const update = async (order: Partial<OrderRecord>) => {
        if (!order.id) return;
        try {
            await client
                .collection("orders")
                .update<ProductRecord>(order.id, order);
            toast.success("order updated");
            reload();
        } catch (error) {
            toast.error("could not update orders");
        }
    };

    const remove = async (id: string) => {
        try {
            await client.collection("orders").delete(id);
            toast.success("order deleted");
            reload();
        } catch (error) {
            toast.error("could not delete order");
        }
    };

    const deliver = async (order: OrderRecord) => {
        if (order.status !== "packaged") return;

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
        } catch (error) {}
    };

    return { create, update, remove, deliver };
};

export default useOrder;
