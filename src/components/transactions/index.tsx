import { FC } from "react";
import AddTransaction from "./add";
import StatsHeader from "../misc/StatsHeader";
import TransactionList from "./list";

const Transactions: FC = () => {
    return (
        <>
            <StatsHeader />
            <TransactionList />
            <AddTransaction />
        </>
    );
};

export default Transactions;
