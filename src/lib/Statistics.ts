import TransactionRecord from "@/types/TransactionRecord";
import Contact from "../types/Contact";
import Record from "../types/Record";
import Transaction from "../types/Transaction";
import { client } from "./Pocketbase";
import moment from "moment";

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
    const cashflow = transactions.reduce((i, t) => {
        if (t.type === "Ausgabe") return (i += t.amount);
        if (t.type === "Einnahme") return (i += t.amount);
        if (t.type === "Rückzahlung") return (i += t.amount);
        return i;
    }, 0);

    return cashflow;
};

function calculateAverageAmountPerDay(
    transactions: Record<Transaction>[]
): number {
    // Calculate the number of days in the timespan
    if (!transactions[0]) return 0;
    const startDate = new Date(transactions[0].date);
    const numDays =
        (new Date().getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);

    // Calculate the total amount spent
    const totalAmountSpent = transactions.reduce(
        (total, t) => total + t.amount,
        0
    );

    // Calculate the average amount per day
    const averageAmountPerDay = totalAmountSpent / numDays;

    return averageAmountPerDay;
}

type IndexObject = {
    [key: number]: TransactionRecord[];
};

const calcAvgAmountPerWeek = (transactions: TransactionRecord[]) => {
    transactions = transactions.filter(
        (t) => t.type === "Einnahme" || t.type === "Rechnung"
    );

    const groupedTransactions = transactions.reduce(
        (acc: IndexObject, transaction) => {
            const week = moment(transaction.date).week();
            if (!acc[week]) {
                acc[week] = [];
            }
            acc[week].push(transaction);
            return acc;
        },
        {}
    );

    const sumByWeek = Object.values(groupedTransactions).map(
        (weekTransactions) =>
            weekTransactions.reduce(
                (sum, transaction) => sum + transaction.amount,
                0
            )
    );

    const averageAmountPerWeek =
        sumByWeek.reduce((sum, weekAmount) => sum + weekAmount, 0) /
        sumByWeek.length;

    return averageAmountPerWeek ? averageAmountPerWeek : 0;
};

export {
    getPendingMoney,
    getMoneyToPayBack,
    getBalance,
    getCashflow,
    calculateAverageAmountPerDay,
    calcAvgAmountPerWeek,
};
