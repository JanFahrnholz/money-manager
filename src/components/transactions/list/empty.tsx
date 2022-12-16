import { Typography } from "@mui/material";
import { FC } from "react";
import Illustration from "../../../public/assets/empty-transactions.svg";

const EmptyTransactions: FC = () => {
    return (
        <>
            <div className="p-2 mt-[15vh] text-center">
                <Typography sx={{ mb: 2 }}>
                    Your Transactions will be listed here
                </Typography>
                <Illustration />
                <Typography sx={{ mt: 2 }}>
                    Step 2: Create your first transaction
                </Typography>
            </div>
        </>
    );
};

export default EmptyTransactions;
