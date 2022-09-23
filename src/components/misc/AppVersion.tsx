import { FC } from "react";
import { version } from "../../package.json";

const AppVersion: FC = () => {
    return <>v{version}</>;
};

export default AppVersion;
