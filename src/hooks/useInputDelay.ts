import { useEffect, useState } from "react";

const useInputDelay = (delay: number, callback: Function) => {
    const [lastChanged, setLastChanged] = useState(Date.now());
    useEffect(() => {
        const timer = setTimeout(() => {
            if (Date.now() - lastChanged >= delay) callback();
        }, delay);
    }, [lastChanged]);

    const reset = () => setLastChanged(Date.now());

    return reset;
};

export default useInputDelay;
