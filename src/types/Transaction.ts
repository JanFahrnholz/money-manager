type Transaction = {
    id: number;
    personId: number;
    amount: number;
    date: Date;
    typeId: number;
    relatedTransactionId: number | null;
};

export default Transaction;
