import Contact from "@/types/Contact";
import Record from "@/types/Record";
import { ProductRecord } from "./Product";

export type Order = {
    product: ProductRecord;
    contact: Record<Contact>;
    quantity: number;
    status: OrderStatus;
    message: string;
    payDirectly: boolean;
};

export type OrderStatus =
    | "open"
    | "accepted"
    | "declined"
    | "packaged"
    | "delivered"
    | "canceled";

export type OrderRecord = Record<Order>;
