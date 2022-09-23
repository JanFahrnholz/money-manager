import {
    Accordion,
    AccordionSummary,
    Typography,
    AccordionDetails,
} from "@mui/material";
import { FC, useState } from "react";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import settings from "../../../config/profileSettings";

const ProfileSettings: FC = () => {
    const [expanded, setExpanded] = useState<string | false>(false);

    const handleChange =
        (panel: string) =>
        (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    return (
        <>
            {settings.map((setting) => (
                <Accordion
                    TransitionProps={{ unmountOnExit: true }}
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
        </>
    );
};

export default ProfileSettings;
