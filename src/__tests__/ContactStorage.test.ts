import { describe, expect, test } from "@jest/globals";

import ContactStorage from "../lib/ContactStorage";
import TransactionStorage from "../lib/TransactionStorage";
import Contact from "../types/Contact";
import Transaction from "../types/Transaction";

let transactions: Transaction[] = [];
const setTransactions = (t: Transaction[]) => (transactions = t);
const t = new TransactionStorage(transactions, setTransactions);

let contacts: Contact[] = [];
const setContacts = (c: Contact[]) => (contacts = c);
const c = new ContactStorage(contacts, setContacts);

describe("TransactionStorage.cy.ts", () => {
    test("Add contact", () => {
        c.add("Test", 0, 1);
        expect(contacts).toMatchObject([
            { id: 1, name: "Test", balance: 0, transactions: [] },
        ]);
    });

    test("Update balance to -100", () => {
        c.addBalance(1, 100);
        expect(contacts).toMatchObject([
            { id: 1, name: "Test", balance: -100, transactions: [] },
        ]);
    });

    test("get initials with single char", () => {
        expect(c.getInitials(1)).toBe("T");
    });

    test("update name", () => {
        c.editName(1, "Test Test");
        expect(contacts).toMatchObject([
            { id: 1, name: "Test Test", balance: -100, transactions: [] },
        ]);
    });

    test("get initials with double char", () => {
        expect(c.getInitials(1)).toBe("TT");
    });

    test("add transaction", () => {
        c.addTransaction(1, 1);
        expect(contacts).toMatchObject([
            { id: 1, name: "Test Test", balance: -100, transactions: [1] },
        ]);
    });

    test("Find existing contact by id", () => {
        expect(c.findById(1)).toMatchObject({
            id: 1,
            name: "Test Test",
            balance: -100,
            transactions: [1],
        });
    });

    test("Find non existing contact by id", () => {
        expect(c.findById(2)).toBe(undefined);
    });

    test("delete contact", () => {
        c.delete(1);
        expect(contacts).toStrictEqual([]);
    });
});
