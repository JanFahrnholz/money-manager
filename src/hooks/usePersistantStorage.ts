import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";

export default function usePersistantState<T>(
    key: string,
    initialValue: T
): [T, (value: T) => void] {
    const [state, setInternalState] = useState<T>(initialValue);

    useEffect(() => {
        const value = localStorage.getItem(key);

        if (!value) return;

        setInternalState(JSON.parse(value));
    }, [key]);

    const setState = (value: T) => {
        localStorage.setItem(key, JSON.stringify(value));
        setInternalState(value);
    };

    return [state, setState];
}
