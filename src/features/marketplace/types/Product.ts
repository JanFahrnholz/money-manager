import Record from "@/types/Record";

export type Product = {
    name: string;
    description?: string;
    price: number;
    unit: string;
    stock?: number;
    owner: string;
    divisible?: boolean;
    disabled?: boolean;
};

export type ProductRecord = Record<Product>;
