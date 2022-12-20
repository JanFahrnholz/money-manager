import { useState } from "react";

type Props = {
	selected: string;
	select: (option: string) => void;
	options: string[];
};

function useSelect(options: string[], defaultValue = "None") {
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
