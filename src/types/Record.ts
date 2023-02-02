type Record<T> = {
    CollectionId: number;
    CollectionName: string;
    expand: any;
    id: string;
    created: Date;
    updated: Date;
} & T;

type ExpandedData<A> = {};

export default Record;
