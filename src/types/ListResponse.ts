import Record from "./Record";

type ListResponse<T> = {
    page: number;
    perPage: number;
    totalItems: number;
    items: Record<T>[];
};

export default ListResponse;
