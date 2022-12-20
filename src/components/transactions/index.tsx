import { FC } from "react";
import AddTransaction from "./add";
import StatsHeader from "../misc/StatsHeader";
import TransactionList from "./list";
import PlannedTransactions from "./planned";

const Transactions: FC = () => {
    return (
        <>
            <StatsHeader />
            <PlannedTransactions />
            <TransactionList />
            <AddTransaction />
        </>
    );
};

export default Transactions;
