type Record<T> = {
    CollectionId: number;
    CollectionName: string;
    expand: any;
    id: string;
    created: Date;
    updated: Date;
} & T;

export default Record;
