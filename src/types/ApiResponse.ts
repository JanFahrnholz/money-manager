import Record from "./Record";

type ApiResponse<T> = {
    page: number;
    perPage: number;
    totalItems: number;
    items: Record<T>[];
};

export default ApiResponse;
