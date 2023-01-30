import Record from "@/types/Record";

export type Product = {
    name: string;
    description?: string;
    price: number;
    unit: string;
    stock?: number;
    owner: string;
    disabled?: boolean;
};

export type ProductRecord = Record<Product>;
