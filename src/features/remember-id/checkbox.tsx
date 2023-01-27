import { Checkbox, FormControlLabel } from "@mui/material";
import { FC, useEffect } from "react";
import useRememberId from "./use-remember-id";

interface Props {
    enabled: boolean;
    setEnabled: Function;
}

const RememberUserIdCheckbox: FC<Props> = ({ enabled, setEnabled }) => {
    return (
        <>
            <FormControlLabel
                label="Remember Id"
                control={
                    <Checkbox
                        checked={enabled}
                        onClick={() => setEnabled(!enabled)}
                    />
                }
            />
        </>
    );
};

export default RememberUserIdCheckbox;
