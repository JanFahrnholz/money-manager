import { Alert } from "@mui/material";
import { FC, useContext } from "react";
import { UserContext } from "../../context/UserContext";

type Props = {
    msg: string;
};

const MustBeLoggedInAlert: FC<Props> = ({ msg }) => {
    const { user } = useContext(UserContext);

    return (
        <>
            {!user && (
                <Alert severity="info" variant="outlined">
                    {msg}
                </Alert>
            )}
        </>
    );
};

export default MustBeLoggedInAlert;
