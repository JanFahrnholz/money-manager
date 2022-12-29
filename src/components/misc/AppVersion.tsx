import useOnVersionChange from "hooks/useOnVersionChange";
import { FC } from "react";
import { toast } from "react-hot-toast";
import project from "../../package.json";

const AppVersion: FC = () => {
	return <>v{project.version}</>;
};

export default AppVersion;
