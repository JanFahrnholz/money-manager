import { CircularProgress } from "@mui/material";
import { FC } from "react";

type Props = {
    value: any | undefined;
    size?: number;
};

const LoadValue: FC<Props> = ({ value, size }) => {
    if (value === undefined)
        return (
            <CircularProgress
                variant="determinate"
                thickness={4}
                size={size || 25}
            />
        );

    return <>{value}</>;
};

export default LoadValue;
