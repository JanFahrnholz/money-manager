import AppVersion from "../components/misc/AppVersion";
import AboutSection from "../components/profile/about";
import AccountSettings from "../components/profile/settings/account";
import CloudDataSettings from "../components/profile/settings/cloud-data";
import EraseData from "../components/profile/settings/local-data/erase";
import ExportData from "../components/profile/settings/local-data/export";
import ImportData from "../components/profile/settings/local-data/import";
import Setting from "../types/Setting";

const settings: Setting[] = [
    {
        id: "account-settings",
        title: "Your account",
        content: <AccountSettings />,
    },
    {
        id: "cloud-data-settings",
        title: "Cloud data",
        content: <CloudDataSettings />,
    },
    {
        id: "data-settings",
        title: "Device data",
        content: (
            <>
                <ExportData />
                <ImportData />
                <EraseData />
            </>
        ),
    },
];

export default settings;
