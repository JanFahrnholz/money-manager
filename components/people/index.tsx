import { FC } from "react";
import AddContact from "./add";
import ContactListHeader from "./header";
import ContactList from "./list";

const People: FC = () => {
    return (
        <>
            <ContactListHeader />
            <ContactList />
            <AddContact />
        </>
    );
};

export default People;
