import Contact from "@/types/Contact";
import { client } from "lib/Pocketbase";
import { toast } from "react-hot-toast";
import { ProductRecord } from "../types/Product";

const useOrder = () => {
    const id = client.authStore.model?.id;
    const create = async (product: ProductRecord, quantity: number) => {
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
            });
            toast.success("Your order has been placed");
        } catch (error) {
            toast.error("Couldnt place order");
            console.log(error);
        }
    };

    return { create };
};

export default useOrder;
