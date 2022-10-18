import { FC } from "react";
import AddTransaction from "./add";
import StatsHeader from "../misc/StatsHeader";
import TransactionList from "./list";

const Transactions: FC = () => {
    return (
        <div className="w-100 h-full border-t-2 border-blue-700">
            <StatsHeader />
            <TransactionList />
            <AddTransaction />
        </div>
    );
};

export default Transactions;
