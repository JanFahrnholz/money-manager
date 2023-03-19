import Contact from "@/types/Contact";
import Record from "@/types/Record";
import { ProductRecord } from "./Product";

export type Order = {
    product: string;
    contact: string;
    chat: string;
    quantity: number;
    status: OrderStatus;
    payDirectly: boolean;
    when: Date;
    location: string;
};

export type OrderStatus =
    | "open"
    | "accepted"
    | "declined"
    | "packaged"
    | "delivered"
    | "canceled";

export type OrderRecord = Record<Order>;
