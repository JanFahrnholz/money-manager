import usePersistentState from "hooks/usePersistentStorage";
import { useEffect, useState } from "react";

const useRememberId = () => {
	const [id, setIdInternal] = useState("");
	const [remember, setRemember] = usePersistentState("remember_me_id", "");
	const [enabled, setEnabledInternal] = usePersistentState(
		"remember_me_enabled",
		false
	);

	useEffect(() => {
		if (enabled) setId(remember);
	}, [enabled, remember]);

	const setEnabled = (value: boolean) => {
		if (!value) setRemember("");
		if (value) setRemember(id);
		setEnabledInternal(value);
	};

	const setId = (value: string) => {
		setIdInternal(value);
		if (enabled) setRemember(id);
	};

	return [id, setId, enabled, setEnabled];
};

export default useRememberId;
