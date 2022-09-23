import Transaction from "../types/Transaction";
import TransactionType from "../types/TransactionType";
const _ = require("lodash");

class TransactionStorage {
    transactions: Transaction[];
    setTransactions: Function;
    types: TransactionType[] = [
        { id: 1, color: "#ff1c1c", name: "Einkauf" },
        { id: 2, color: "#62D836", name: "Verkauf" },
        { id: 3, color: "#ff1c1c", name: "Rechnung" },
        { id: 4, color: "#62D836", name: "Rückzahlung" },
    ];

    constructor(transactions: Transaction[], setTransactions: Function) {
        this.transactions = transactions;
        this.setTransactions = setTransactions;
    }

    public add = (
        amount: number,
        personId: number,
        typeId: number,
        relatedTransactionId: number | null = null
    ) => {
        const date = new Date();
        const t = {
            id: this.generateId(),
            personId,
            amount,
            date,
            typeId,
            relatedTransactionId,
        };

        this.transactions.unshift(t);
        this.reload();

        return t;
    };

    public delete = (id: number) => {
        _.remove(this.transactions, { id });
        this.reload();
    };

    public findById = (id: number | undefined) => {
        if (id === undefined) return;
        let t = this.transactions.find((t) => t.id === id);

        if (!t) return null;

        return t;
    };

    public getTypeById = (id: number | undefined) => {
        if (id === undefined) return;

        return this.types.find((t) => t.id === id);
    };

    public getSortedTransactions = () => {
        const t = _.groupBy(this.transactions, ({ date }: { date: Date }) =>
            new Date(date).getMonth()
        );

        return Object.values(t).reverse() as Transaction[][];
    };

    public getTransactionTypebyId = (id: number) => {
        return this.types.find((t) => t.id === id);
    };

    public isType = (
        transactionId: number,
        type: "Einkauf" | "Verkauf" | "Rechnung" | "Rückzahlung"
    ) => {
        const typeId = this.findById(transactionId)?.typeId;

        if (!typeId) return false;

        if (this.getTypeById(typeId)?.name === type) return true;

        return false;
    };

    public getIsPaid = (transactionId: number) => {
        if (!this.isType(transactionId, "Rechnung")) return;

        const t = this.findById(transactionId);

        if (!t?.relatedTransactionId) return false;

        return true;
    };

    public getPendingTransactions = () => {};

    public generateId = () => new Date().valueOf() + this.transactions.length;

    public reload = () => {
        const t = [...this.transactions];

        this.setTransactions(t);
    };
}

export default TransactionStorage;
