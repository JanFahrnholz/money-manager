import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import Backup from "../types/Backup";

function useSync<T>(key: string, data: T) {
    const backup: Backup<T> = {
        data,
        time: new Date(),
    };

    const [state, setInternalState] = useState<Backup<T>>(backup);
    const { user, getPreferences, sync } = useContext(UserContext);

    useEffect(() => {
        const syncInternal = async () => {
            let pref = backup;
            try {
                pref = (await getPreferences(key)) as Backup<T>;
            } catch (e) {
                console.error(e);
            }
            if (pref === undefined) return;
            if (pref.data === undefined) return;

            setInternalState({
                data: pref.data,
                time: new Date(),
            });
        };
        syncInternal();
    }, [user]);

    function setState(data: T) {
        const backup: Backup<T> = {
            data,
            time: new Date(),
        };

        setInternalState(backup);
        if (!user) return;

        sync(key, data);
    }

    const getState = async () => {
        if (!user) return;
        return await getPreferences(key);
    };

    return [state.data, setState, getState];
}

export default useSync;
