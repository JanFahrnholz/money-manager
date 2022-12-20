import { CircularProgress } from "@mui/material";
import { FC } from "react";

type Props = {
    children: any;
    value: any | undefined;
};

const LoadUntilDefined: FC<Props> = ({ children, value }) => {
    if (value === undefined)
        return (
            <div className="mx-auto p-4">
                <CircularProgress />
            </div>
        );

    return <>{children}</>;
};

export default LoadUntilDefined;
