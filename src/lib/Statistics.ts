import TransactionRecord from "@/types/TransactionRecord";
import Contact from "../types/Contact";
import Record from "../types/Record";
import Transaction from "../types/Transaction";
import { client } from "./Pocketbase";

const getPendingMoney = (contacts: Record<Contact>[]): number => {
    let pending = 0;
    const owner = client.authStore.model?.id;

    contacts.map((contact) => {
        if (contact.balance < 0 && contact.owner == owner) {
            pending += -1 * contact.balance;
        }
        if (contact.balance > 0 && contact.owner != owner) {
            pending += contact.balance;
        }
    });

    return pending;
};

const getMoneyToPayBack = (contacts: Record<Contact>[]): number => {
    let toPay = 0;
    const owner = client.authStore.model?.id;

    contacts.map((contact) => {
        if (contact.balance > 0 && contact.owner == owner)
            toPay += contact.balance;
        if (contact.balance < 0 && contact.owner != owner)
            toPay += -1 * contact.balance;
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

type byDay = { [day: number]: TransactionRecord[] };

function calculateAverageAmountPerDay(
    transactions: TransactionRecord[]
): number {
    // Group the transactions by day
    const transactionsByDay: byDay = transactions.reduce((days, t) => {
        const date = new Date(t.date);
        const day = date.getDay();
        if (!days[day]) {
            days[day] = [];
        }
        days[day].push(t);
        return days;
    }, {} as byDay);

    // Calculate the average amount per day
    const averageAmountPerDay: number[] = Object.values(transactionsByDay).map(
        (dayTransactions) => {
            const totalAmount = dayTransactions.reduce(
                (total, t) => total + t.amount,
                0
            );
            return totalAmount / dayTransactions.length;
        }
    );

    const averageAmount: number = averageAmountPerDay.reduce(
        (total, avgPerDay) => {
            return total + avgPerDay;
        },
        0
    );

    return averageAmount / averageAmountPerDay.length || 0;
}

export {
    getPendingMoney,
    getMoneyToPayBack,
    getBalance,
    getCashflow,
    calculateAverageAmountPerDay,
};
