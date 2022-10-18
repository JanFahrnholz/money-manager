import {
    Accordion,
    AccordionSummary,
    Typography,
    AccordionDetails,
} from "@mui/material";
import { FC } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import settings from "../../../config/profileSettings";
import usePersistantState from "../../../hooks/usePersistantStorage";

const ProfileSettings: FC = () => {
    const [expanded, setExpanded] = usePersistantState<string | false>(
        "mm-settings-expanded",
        false
    );

    const handleChange =
        (panel: string) =>
        (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    return (
        <>
            <AccordionSummary>
                <Typography sx={{ color: "#fff" }}>Settings</Typography>
            </AccordionSummary>

            {settings.map((setting) => (
                <Accordion
                    TransitionProps={{ unmountOnExit: false }}
                    sx={{ zIndex: -10 }}
                    disableGutters
                    key={setting.id}
                    expanded={expanded === setting.id}
                    onChange={handleChange(setting.id)}
                    className="shadow-none z-50"
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`${setting.id}-content`}
                        id={`${setting.id}-header`}
                        className="bg-dark-800"
                    >
                        <Typography sx={{ flexShrink: 0 }}>
                            {setting.title}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails className="bg-dark-900 p-2 py-4">
                        {setting.content}
                    </AccordionDetails>
                </Accordion>
            ))}
            <div className="h-24"></div>
        </>
    );
};

export default ProfileSettings;
