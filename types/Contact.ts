// type Contact = {
//     id: number;
//     name: string;
//     balance: number;
// };

import Transaction from "./Transaction";

class Contact {
    id: number;
    name: string;
    balance: number;
    transactions: number[] = [];

    constructor(id: number, name: string, balance = 0) {
        this.id = id;
        this.name = name;
        this.balance = balance;
    }
}

export default Contact;
