import {
    List,
    ListItem,
    ListItemText,
    ListSubheader,
    Fab,
    Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useContext } from "react";
import { FC } from "react";
import { TransactionContext } from "../../context/TransactionContext";
import AddTransaction from "./add";
import StatsHeader from "../misc/StatsHeader";
import Transaction from "../../types/Transaction";
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
