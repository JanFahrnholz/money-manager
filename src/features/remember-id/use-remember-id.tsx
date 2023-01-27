import usePersistentState from "hooks/usePersistentStorage";
import { useEffect, useState } from "react";

const useRememberId = () => {
    const [id, setIdInternal] = useState("");
    const [remember, setRemember] = usePersistentState("remember_me_id", "");
    const [enabled, setEnabledInternal] = useState(false);

    console.log(`id: '${id}'`, "rem:", remember, enabled);

    useEffect(() => {
        if (remember !== "" && remember) {
            setEnabledInternal(true);
            setId(remember);
        }
    }, [remember]);

    const setEnabled = (value: boolean) => {
        value && setRemember(id);
        !value && setRemember("");
        setEnabledInternal(value);
    };

    const setId = (value: string) => {
        setIdInternal(value);
        enabled && setRemember(value);
    };

    return { id, setId, enabled, setEnabled };
};

export default useRememberId;
