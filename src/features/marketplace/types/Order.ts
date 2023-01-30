import Contact from "@/types/Contact";
import Record from "@/types/Record";
import { ProductRecord } from "./Product";

export type Order = {
    product: ProductRecord;
    quantity: number;
    contact: Record<Contact>;
};

export type OrderRecord = Record<Order>;
