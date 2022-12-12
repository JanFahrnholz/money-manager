import TransactionType from "./TransactionType";

type Transaction = {
    amount: number;
    info: string;
    date: Date;
    planned: boolean;
    type: TransactionType;
    user: string;
    owner: string;
};

export default Transaction;

// "amount": 123,
// "info": "test",
// "date": "2022-01-01 10:00:00",
// "contact": "RELATION_RECORD_ID",
// "owner": "test",
// "type": "Einnahme"
