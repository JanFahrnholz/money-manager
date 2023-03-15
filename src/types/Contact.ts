import { Record } from "pocketbase";

type Contact = Record & {
    id: string;
    name: string;
    balance: number;
    user: string;
    owner: string;
};

export default Contact;
