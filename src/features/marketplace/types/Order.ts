import Contact from "@/types/Contact";
import Record from "@/types/Record";
import { ProductRecord } from "./Product";

export type Order = {
    product: ProductRecord;
    contact: Record<Contact>;
    quantity: number;
    status: OrderStatus;
    message: string;
};

export type OrderStatus =
    | "open"
    | "accepted"
    | "declined"
    | "packaged"
    | "delivered";

export type OrderRecord = Record<Order>;
