import AboutSection from "../components/profile/about";
import EraseData from "../components/profile/settings/dataSettings/erase";
import ExportData from "../components/profile/settings/dataSettings/export";
import ImportData from "../components/profile/settings/dataSettings/import";
import GeneralSettings from "../components/profile/settings/generalSettings";
import Setting from "../types/Setting";

const settings: Setting[] = [
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
