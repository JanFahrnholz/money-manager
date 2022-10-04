import { describe, expect, test, jest } from "@jest/globals";
import ContactStorage from "../lib/ContactStorage";
import TransactionStorage from "../lib/TransactionStorage";
import ProfileStorage from "../lib/ProfileStorage";
import Contact from "../types/Contact";
import Transaction from "../types/Transaction";

jest.useFakeTimers().setSystemTime(new Date());

let transactions: Transaction[] = [];
const setTransactions = (t: Transaction[]) => (transactions = t);
const t = new TransactionStorage(transactions, setTransactions);

let contacts: Contact[] = [];
const setContacts = (c: Contact[]) => (contacts = c);
const c = new ContactStorage(contacts, setContacts);

const profile = new ProfileStorage(t, c);

c.add("Test", 0, 1);

describe("TransactionStorage.cy.ts", () => {
    test("Add Transaction from type Ausgabe", () => {
        t.add(50, 1, 1, null);

        expect(transactions).toMatchObject([
            {
                id: new Date().valueOf(),
                amount: 50,
                typeId: 1,
                personId: 1,
                relatedTransactionId: null,
                date: new Date(),
            },
        ]);
    });

    test("Test getTypeById", () => {
        expect(t.getTypeById(1)).toBe(t.types[0]);
        expect(t.getTypeById(2)).toBe(t.types[1]);
        expect(t.getTypeById(3)).toBe(t.types[2]);
        expect(t.getTypeById(4)).toBe(t.types[3]);
    });

    test("Test isType", () => {
        expect(t.isType(new Date().valueOf(), "Ausgabe"));
    });

    test("Add Transaction from type Einnahme", () => {
        t.add(25, 1, 2, null);

        expect(transactions).toMatchObject([
            {
                id: new Date().valueOf(),
                amount: 25,
                typeId: 2,
                personId: 1,
                date: new Date(),
            },
            {
                id: new Date().valueOf(),
                amount: 50,
                typeId: 1,
                personId: 1,
                relatedTransactionId: null,
                date: new Date(),
            },
        ]);
    });

    test("Test profile balance calculation", () => {
        const balance = profile.statistics.find((s) => s.name === "Balance");
        expect(balance?.value()).toBe(-25);
    });
});
