import { useState } from "react";

function useSelect(options: string[], defaultValue = "none") {
    const [value, setValue] = useState<string>(defaultValue);

    options.push(defaultValue);

    const select = (option: string) => {
        option =
            options.find((validOption) => validOption === option) ||
            defaultValue;

        setValue(option);
    };

    return { value, select, options };
}

export default useSelect;
