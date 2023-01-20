import { FC } from "react";
import AddTransaction from "./add";
import StatsHeader from "../misc/StatsHeader";
import TransactionList from "./list";
import TransactionLoadingList from "../misc/loading-list";

const Transactions: FC = () => {
    return (
        <>
            <StatsHeader />
            <TransactionList />
            {/* <TransactionLoadingList /> */}
            <AddTransaction />
        </>
    );
};

export default Transactions;
