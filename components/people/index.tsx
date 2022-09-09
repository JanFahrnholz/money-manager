import { FC } from "react";
import AddContact from "./add";
import ContactList from "./list";

const People: FC = () => {
    return (
        <>
            <ContactList />
            <AddContact />
        </>
    );
};

export default People;
