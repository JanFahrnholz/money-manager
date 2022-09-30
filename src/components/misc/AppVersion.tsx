import { FC } from "react";
import project from "../../package.json";

const AppVersion: FC = () => {
    return <>v{project.version}</>;
};

export default AppVersion;
