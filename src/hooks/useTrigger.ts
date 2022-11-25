import { useEffect, useState } from "react";

export default function useTrigger(): [boolean, () => void] {
    const [state, setInternalState] = useState(false);

    const trigger = () => {
        const t = !state;
        setInternalState(t);
    };

    return [state, trigger];
}
