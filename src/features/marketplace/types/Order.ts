import Contact from "@/types/Contact";
import Chat from "features/chats/types/chat";
import { Record } from "pocketbase";
import { ProductRecord } from "./Product";

export type Order = {
    product: ProductRecord;
    contact: Record & Contact;
    chat: string;
    quantity: number;
    status: OrderStatus;
    message: string;
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

export type OrderRecord = Record & Order;
