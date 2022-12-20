import { CircularProgress } from "@mui/material";
import { FC } from "react";

type Props = {
    children: any | undefined;
    value: any | undefined;
};

const Loader: FC<Props> = ({ children, value }) => {
    if (!value)
        return (
            <div className="mx-auto p-4 text-center">
                <CircularProgress />
            </div>
        );

    return <>{children}</>;
};

export default Loader;
