import Contact from "../types/Contact";
const _ = require("lodash");

class ContactStorage {
    contacts: Contact[];
    setContacts: Function;

    constructor(contacts: Contact[], setContacts: Function) {
        this.contacts = contacts;
        this.setContacts = setContacts;
    }

    public add = (name: string, balance = 0) => {
        const p = new Contact(this.generateId(), name, balance);

        this.contacts.push(p);
        this.reload();

        return this.contacts;
    };

    public editName = (id: number, name: string) => {
        this.setContacts(
            this.contacts.map((c) => {
                if (c.id === id) {
                    c.name = name;
                    return c;
                }
                return c;
            })
        );
    };

    public editBalance = (id: number, balance: number) => {
        this.setContacts(
            this.contacts.map((c) => {
                if (c.id === id) {
                    c.balance = balance;
                    return c;
                }
                return c;
            })
        );
    };

    public delete = (id: number) => {
        _.remove(this.contacts, { id });
        this.reload();
    };

    public findById = (id: number | undefined) => {
        if (id === undefined) return;
        return this.contacts.find((p) => p.id === id);
    };

    public getInitials = (id: number) => {
        const p = this.findById(id);

        if (!p) return;

        var names = p.name.split(" "),
            initials = names[0].substring(0, 1).toUpperCase();

        if (names.length > 1) {
            initials += names[names.length - 1].substring(0, 1).toUpperCase();
        }
        return initials;
    };

    public addBalance = (id: number, balance: number) => {
        this.setContacts(
            this.contacts.map((c) => {
                if (c.id === id) {
                    c.balance -= balance;
                    return c;
                }
                return c;
            })
        );
    };

    public addTransaction = (contactId: number, transactionId: number) => {
        this.setContacts(
            this.contacts.map((c) => {
                if (c.id === contactId) {
                    c.transactions.push(transactionId);
                    return c;
                }
                return c;
            })
        );
    };

    private generateId = () => new Date().valueOf() + this.contacts.length;

    public reload = () => {
        const t = [...this.contacts];
        this.setContacts(t);
    };
}

export default ContactStorage;
