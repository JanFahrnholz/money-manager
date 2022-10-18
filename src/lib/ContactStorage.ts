import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Backup from "../types/Backup";
import Contact from "../types/Contact";
const _ = require("lodash");

class ContactStorage {
    contacts: Contact[];
    setContacts: Function;
    sync: Function;
    getPreferences: Function;

    constructor(contacts: Contact[], setContacts: Function) {
        this.contacts = contacts;
        this.setContacts = setContacts;

        const { sync, getPreferences } = useContext(UserContext);
        this.sync = sync;
        this.getPreferences = getPreferences;
    }

    public backup = async () => {
        await this.sync("contacts", this.contacts);

        this.setContacts([...this.contacts]);
    };

    public deleteBackup = async () => {
        await this.sync("contacts", []);
    };

    public restore = async () => {
        this.getPreferences("contacts").then((pref: Backup<Contact[]>) =>
            this.setContacts(pref.data)
        );
    };

    public add = (name: string, balance = 0, id?: number | undefined) => {
        const p = new Contact(id || this.generateId(), name, balance);

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
