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

c.add("Test", 0, 1);

describe("TransactionStorage.cy.ts", () => {
    test("Add Transaction from type Einkauf", () => {
        t.add(50, 1, 1);
        expect(transactions).toMatchObject([{}]);
    });
});
