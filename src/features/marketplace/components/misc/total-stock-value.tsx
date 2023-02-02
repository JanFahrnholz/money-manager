import PrivacyMode from "@/components/misc/PrivacyMode";
import { Typography } from "@mui/material";
import { FC } from "react";
import useTotalStockValue from "../../hooks/useTotalStockValue";

const TotalStockValue: FC = () => {
    const stockValue = useTotalStockValue();
    if (stockValue === 0) return <></>;
    return (
        <Typography
            sx={{
                textAlign: "center",
                backgroundColor: "secondary.main",
                borderRadius: 1,
                py: 1,
                mb: 2,
            }}
        >
            <span style={{ color: "#ccc" }}>total stock value: </span>
            <PrivacyMode>{stockValue}€</PrivacyMode>
        </Typography>
    );
};

export default TotalStockValue;
