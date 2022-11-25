import Contact from "../types/Contact";
import Record from "../types/Record";
import Transaction from "../types/Transaction";

const getPendingMoney = (contacts: Record<Contact>[]): number => {
    let pending = 0;

    contacts.map((contact) => {
        if (contact.balance < 0) pending += -1 * contact.balance;
    });

    return pending;
};

const getMoneyToPayBack = (contacts: Record<Contact>[]): number => {
    let toPay = 0;

    contacts.map((contact) => {
        if (contact.balance > 0) toPay += contact.balance;
    });

    return toPay;
};

const getBalance = (transactions: Record<Transaction>[]) => {
    let balance = 0;
    transactions.map((t) => {
        if (t.type === "Ausgabe") balance -= t.amount;
        if (t.type === "Einnahme") balance += t.amount;
        // if (t.type === "Rechnung") balance -= t.amount;
        if (t.type === "Rückzahlung") balance += t.amount;
    });

    return balance;
};
const getCashflow = (transactions: Record<Transaction>[]) => {
    let cashflow = 0;
    transactions.map((t) => {
        if (t.type === "Ausgabe") cashflow += t.amount;
        if (t.type === "Einnahme") cashflow += t.amount;
        if (t.type === "Rückzahlung") cashflow += t.amount;
    });

    return cashflow;
};

export { getPendingMoney, getMoneyToPayBack, getBalance, getCashflow };
