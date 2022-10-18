import ContactStorage from "./ContactStorage";
import TransactionStorage from "./TransactionStorage";

type Statistic = {
    name: string;
    value: () => string | number;
};

class ProfileStorage {
    private t: TransactionStorage;
    private c: ContactStorage;

    constructor(t: TransactionStorage, c: ContactStorage) {
        this.t = t;
        this.c = c;
    }

    public calculate = () => {
        this.statistics.forEach((s) => s.value());
    };

    private calcBalance = () => {
        let balance = 0;

        this.t.transactions.map((t) => {
            if (this.t.isType(t.id, "Ausgabe")) balance -= t.amount;
            if (this.t.isType(t.id, "Einnahme")) balance += t.amount;
            // if (this.t.isType(t.id, "Rechnung")) balance -= t.amount;
            if (this.t.isType(t.id, "Rückzahlung")) balance += t.amount;
        });

        return balance;
    };

    private calcPendingMoney = () => {
        let pending = 0;

        this.c.contacts.map((c) => {
            if (c.balance < 0) pending += c.balance;
        });

        return pending * -1;
    };

    statistics: Statistic[] = [
        {
            name: "Balance",
            value: this.calcBalance,
        },
        {
            name: "Pending Money",
            value: this.calcPendingMoney,
        },
    ];
}

export default ProfileStorage;
