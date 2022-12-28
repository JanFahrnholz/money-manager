import usePersistentState from "./usePersistentStorage";
import project from "../package.json";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

const useOnVersionChange = (callback: (version: string) => void) => {
	const [version, setVersion] = usePersistentState(
		"mm_last_version",
		project.version
	);
	const router = useRouter();

	useEffect(() => {
		if (project.version === version) return;
		setVersion(project.version);
		setTimeout(() => router.reload(), 500);
		callback(project.version);
	});
};

export default useOnVersionChange;
