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
        this.setContacts(this.contacts);
        console.log(this.contacts);
        return this.contacts;
    };

    public findById = (id: number) => {
        const p = this.contacts.find((p) => p.id === id);
        console.info("found", this.contacts, p);
        return p;
    };

    public getInitials = (id: number) => {
        const p = this.findById(id);

        var names = p.name.split(" "),
            initials = names[0].substring(0, 1).toUpperCase();

        if (names.length > 1) {
            initials += names[names.length - 1].substring(0, 1).toUpperCase();
        }
        return initials;
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

    private generateId = () => {
        const l = this.contacts.length;
        if (l < 1) return 1;

        return l + 1;
    };
}

export default ContactStorage;
