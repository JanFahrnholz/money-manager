import AccountSettings from "../components/profile/settings/account";
import EraseData from "../components/profile/settings/data/erase";
import ExportData from "../components/profile/settings/data/export";
import ImportData from "../components/profile/settings/data/import";
import Setting from "../types/Setting";

const settings: Setting[] = [
    {
        id: "account-settings",
        title: "Account settings",
        content: <AccountSettings />,
    },
    {
        id: "data-settings",
        title: "Data settings",
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
