import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import { Button } from "@mui/material";
import usePersistentState from "hooks/usePersistentStorage";
import { FC, ReactNode } from "react";

interface Props {
    children: ReactNode;
    storageKey: string;
}

const UserHelp: FC<Props> = ({ children, storageKey }) => {
    const [show, setShow] = usePersistentState(storageKey, true);

    const toggleButton = () => (
        <Button onClick={() => setShow(!show)}>Dismiss</Button>
    );

    return (
        <>
            {show && <>{children}</>}
            <div className="text-center">
                <Button sx={{ my: 2, mb: 12 }} onClick={() => setShow(!show)}>
                    {show ? "Dismiss" : <HelpOutlineOutlinedIcon />}
                </Button>
            </div>
        </>
    );
};

export default UserHelp;
